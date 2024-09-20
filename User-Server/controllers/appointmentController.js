const pool = require('../dbConfig/dbConfig');

// Book an appointment
const createAppointment = async (req, res) => {
  const { patient_id, doctor_id, appointment_date, status, notes } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO Appointments (patient_id, doctor_id, appointment_date, status, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [patient_id, doctor_id, appointment_date, status || 'pending', notes]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
};

// Get all appointments for a doctor
const getAppointmentsForDoctor = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM Appointments WHERE doctor_id = $1',
      [doctorId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  createAppointment,
  getAppointmentsForDoctor,
};
