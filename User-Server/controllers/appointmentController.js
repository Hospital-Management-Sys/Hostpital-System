const pool = require('../dbConfig/dbConfig'); 

exports.addAvailableHours = async (req, res) => {
  const { available_from, available_to, is_available, schedule_id } = req.body;

  // Validate input
  if (!available_from || !available_to || typeof is_available !== 'boolean' || !schedule_id) {
      return res.status(400).json({ message: 'All fields are required.' });
  }

  console.log('Inserting:', { available_from, available_to, is_available, schedule_id });

  const sql = `
      INSERT INTO AvailableHours (available_from, available_to, is_available, schedule_id)
      VALUES ($1::timestamp, $2::timestamp, $3, $4)
      RETURNING *;
  `;

  try {
      const result = await pool.query(sql, [available_from, available_to, is_available, schedule_id]);
      const newAvailableHour = result.rows[0];

      return res.status(201).json({
          message: 'Available hours added successfully.',
          availableHour: newAvailableHour,
      });
  } catch (error) {
      console.error('Error adding available hours:', error);
      return res.status(500).json({ message: 'Failed to add available hours.' });
  }
};



exports.getAvailableHours = async (req, res) => {
  const sql = `
      SELECT available_from, available_to, is_available, schedule_id
      FROM AvailableHours
      WHERE is_available = true
      ORDER BY available_from;
  `;

  try {
      const result = await pool.query(sql);
      const availableHours = result.rows;

      return res.status(200).json({
          message: 'Available hours retrieved successfully.',
          availableHours,
      });
  } catch (error) {
      console.error('Error retrieving available hours:', error);
      return res.status(500).json({ message: 'Failed to retrieve available hours.' });
  }
};


exports.bookAppointment = async (req, res) => {
  const { patientId, doctorId, appointmentDate, notes } = req.body;

  // Validate input
  if (!patientId || !doctorId || !appointmentDate) {
    return res.status(400).json({ message: 'Patient ID, Doctor ID, and Appointment Date are required.' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Check if the selected time is available
    const checkAvailabilitySql = `
      SELECT is_available
      FROM AvailableHours
      WHERE available_from <= $1 AND available_to >= $1 FOR UPDATE
    `;

    const availabilityResult = await client.query(checkAvailabilitySql, [appointmentDate]);

    if (availabilityResult.rows.length === 0 || !availabilityResult.rows[0].is_available) {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: 'Selected time is not available.' });
    }

    // Insert the appointment
    const insertAppointmentSql = `
      INSERT INTO Appointments (patient_id, doctor_id, appointment_date, notes)
      VALUES ($1, $2, $3, $4)
      RETURNING appointment_id;
    `;

    const insertResult = await client.query(insertAppointmentSql, [patientId, doctorId, appointmentDate, notes]);
    const appointmentId = insertResult.rows[0].appointment_id;

    // Update the available hours to mark the time slot as unavailable
    const updateAvailabilitySql = `
      UPDATE AvailableHours
      SET is_available = false
      WHERE available_from <= $1 AND available_to >= $1
    `;
    await client.query(updateAvailabilitySql, [appointmentDate]);

    await client.query('COMMIT');

    return res.status(201).json({
      message: 'Appointment booked successfully.',
      appointmentId,
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error booking appointment:', error);
    return res.status(500).json({ message: 'Failed to book appointment.' });
  } finally {
    client.release();
  }
};