const pool = require('../dbConfig/dbConfig');

// Create a new medical record
const createRecord = async (req, res) => {
  const { doctorId } = req.params;
  const { patient_id, diagnosis, treatment } = req.body;

  console.log(`Creating record for doctorId: ${doctorId}`);
  console.log(`Data: patient_id=${patient_id}, diagnosis=${diagnosis}, treatment=${treatment}`);

  try {
    const result = await pool.query(
      'INSERT INTO PatientRecords (patient_id, doctor_id, diagnosis, treatment) VALUES ($1, $2, $3, $4) RETURNING *',
      [patient_id, doctorId, diagnosis, treatment]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
};

// Get all medical records for a doctor
const getRecordsForDoctor = async (req, res) => {
  const { doctorId } = req.params;

  console.log(`Getting records for doctorId: ${doctorId}`);

  try {
    const result = await pool.query(
      'SELECT * FROM PatientRecords WHERE doctor_id = $1',
      [doctorId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
};

// Get medical records for a specific patient
const getRecordsByPatientId = async (req, res) => {
  const { patientId } = req.params;

  console.log(`Getting records for patientId: ${patientId}`);

  try {
    const result = await pool.query(
      'SELECT * FROM PatientRecords WHERE patient_id = $1',
      [patientId]
    );
    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ error: 'No records found for this patient' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
};

// Update a specific medical record
const updateRecord = async (req, res) => {
  const { recordId } = req.params;
  const { diagnosis, treatment } = req.body;
  const { doctorId } = req.user; // Assuming `doctorId` is obtained from authenticated user's session

  console.log(`Updating recordId: ${recordId}`);
  console.log(`Data: diagnosis=${diagnosis}, treatment=${treatment}`);
  console.log(`DoctorId: ${doctorId}`);

  try {
    // Check if the record belongs to the doctor
    const checkRecord = await pool.query(
      'SELECT * FROM PatientRecords WHERE record_id = $1 AND doctor_id = $2',
      [recordId, doctorId]
    );

    if (checkRecord.rows.length === 0) {
      return res.status(403).json({ error: 'You are not authorized to update this record' });
    }

    // Update the record
    const result = await pool.query(
      'UPDATE PatientRecords SET diagnosis = $1, treatment = $2, updated_at = CURRENT_TIMESTAMP WHERE record_id = $3 RETURNING *',
      [diagnosis, treatment, recordId]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = {
  createRecord,
  getRecordsForDoctor,
  getRecordsByPatientId,
  updateRecord,
};
