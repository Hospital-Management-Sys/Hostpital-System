const pool = require('../dbConfig/dbConfig'); 

// Controller to add available time slots
exports.addAvailableHour = async (req, res) => {
  const { available_from, available_to, is_available, schedule_id } = req.body;

  // Basic validation
  if (!available_from || !available_to || is_available === undefined || !schedule_id) {
      return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
      // Check for overlapping slots
      const overlapCheck = await pool.query(
          `SELECT * FROM availablehours 
           WHERE schedule_id = $1 AND (
               (available_from, available_to) OVERLAPS ($2::timestamp, $3::timestamp)
           )`,
          [schedule_id, available_from, available_to]
      );

      if (overlapCheck.rows.length > 0) {
          return res.status(400).json({ message: 'This time slot overlaps with an existing slot.' });
      }

      // Insert the new available hour
      const result = await pool.query(
          `INSERT INTO availablehours (available_from, available_to, is_available, schedule_id)
           VALUES ($1, $2, $3, $4) RETURNING *`,
          [available_from, available_to, is_available, schedule_id]
      );

      return res.status(201).json(result.rows[0]); // Respond with the newly created row
  } catch (error) {
      console.error('Error inserting available hour:', error);
      return res.status(500).json({ message: 'Internal server error.' });
  }
};


// Controller to update available time slots
exports.updateAvailableHours = async (req, res) => {
  const { id } = req.params;
  const { available_from, available_to, is_available, schedule_id } = req.body;

  try {
    if (!available_from || !available_to || typeof is_available !== 'boolean' || !schedule_id) {
      return res.status(400).json({ error: 'Missing or invalid required fields' });
    }


    // Check if the new time slot overlaps with existing ones
    const overlapCheck = await pool.query(
      `SELECT * FROM AvailableHours 
       WHERE schedule_id = $1 
       AND id != $2
       AND (
         (available_from, available_to) OVERLAPS ($3::timestamp, $4::timestamp)
       )`,
      [schedule_id, id, available_from, available_to]
    );

    if (overlapCheck.rows.length > 0) {
      return res.status(409).json({ error: 'The new time slot overlaps with existing slots' });
    }

    // Update the record
    const result = await pool.query(
      `UPDATE AvailableHours 
       SET available_from = $1, available_to = $2, is_available = $3, schedule_id = $4
       WHERE id = $5 
       RETURNING *`,
      [available_from, available_to, is_available, schedule_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating available hours:', error); // Add this line
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.getAvailableHours = async (req, res) => {
  try {
   
    const query = 'SELECT id, available_from, available_to, is_available, schedule_id FROM availablehours WHERE is_available = true;';
    
    const result = await pool.query(query);

    const availableHours = result.rows;

    if (availableHours.length === 0) {
      return res.status(404).json({ message: 'No available hours found' });
    }

    return res.status(200).json(availableHours);
  } catch (error) {
    console.error('Error fetching available hours:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}; 
// Fetch available hours and their status for the user
exports.getAvailableHours_user = async (req, res) => {
  try {
    // Query to fetch the available hours and their status
    const query = `
      SELECT id, available_from, available_to, is_available
      FROM AvailableHours
    `;

    const result = await pool.query(query);  // Execute the query

    // Format the result to match the calendar structure
    const availableHours = result.rows.map(hour => ({
      id: hour.id,
      title: hour.is_available ? 'Available' : 'Booked',  // 'Booked' if not available
      start: hour.available_from,
      end: hour.available_to,
      allDay: false,  // Assumes the event is not an all-day event
    }));

    // Return the formatted available hours
    res.status(200).json(availableHours);
  } catch (error) {
    console.error('Error fetching available hours:', error);
    res.status(500).json({ error: 'Failed to fetch available hours' });
  }
};

exports.bookAppointment = async (req, res) => {
  try {
    const { patient_id, doctor_id, appointment_date, status } = req.body;

    // Insert the new appointment into the Appointments table
    const query = `
      INSERT INTO Appointments (patient_id, doctor_id, appointment_date, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const values = [patient_id, doctor_id, appointment_date, status]; // Use the provided status

    const result = await pool.query(query, values);

    // Optional: Mark the appointment time as booked, if applicable

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment: result.rows[0],
    });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ error: 'Failed to book appointment' });
  }
};


exports.deleteBookedSlots = async (req, res) => {
  try {
    const query = `
      DELETE FROM availablehours
      USING appointments
      WHERE availablehours.id = appointments.appointment_id
      AND appointments.status = 'Booked';
    `;

    await pool.query(query);

    return res.status(200).json({ message: 'Booked slots deleted successfully' });
  } catch (error) {
    console.error('Error deleting booked slots:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};



