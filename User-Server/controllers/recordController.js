const db = require('../dbConfig/dbConfig'); // Assuming you use PostgreSQL

// Get all records for a doctor
exports.getDoctorRecords = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const patientName = req.query.patientName; // Get patientName from query params

    const query = `
      SELECT 
        pr.record_id,
        p.user_id AS patient_id,
        p.name AS patient_name,
        pr.diagnosis,
        pr.treatment,
        pr.created_at AS record_created_at,
        pr.updated_at AS record_updated_at
      FROM 
        PatientRecords pr
      JOIN 
        Patients p ON pr.patient_id = p.user_id
      WHERE 
        pr.doctor_id = $1
        ${patientName ? 'AND p.name ILIKE $2' : ''}
    `;

    const queryParams = patientName ? [doctorId, `%${patientName}%`] : [doctorId];
    const records = await db.query(query, queryParams);

    res.status(200).json({
      success: true,
      records: records.rows,
    });
  } catch (error) {
    console.error('Error fetching doctor records:', error);
    res.status(500).json({ success: false, message: 'Error fetching records' });
  }
};



// Add a new patient record
exports.addPatientRecord = async (req, res) => {
  try {
    const { patient_id, diagnosis, treatment } = req.body;
    const doctorId = req.params.doctorId; // Get doctor ID from URL parameters

    const query = `
      INSERT INTO PatientRecords (patient_id, doctor_id, diagnosis, treatment, created_at, updated_at)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *;
    `;

    const newRecord = await db.query(query, [patient_id, doctorId, diagnosis, treatment]);

    res.status(201).json({
      success: true,
      record: newRecord.rows[0],
    });
  } catch (error) {
    console.error('Error adding patient record:', error);
    res.status(500).json({ success: false, message: 'Error adding record' });
  }
};

exports.editPatientRecord = async (req, res) => {
  try {
    const { recordId } = req.params;
    const { diagnosis, treatment } = req.body;
    const doctorId = req.params.doctorId; // Get doctorId from URL parameters

    const query = `
      UPDATE PatientRecords
      SET diagnosis = $1, treatment = $2, updated_at = CURRENT_TIMESTAMP
      WHERE record_id = $3 AND doctor_id = $4
      RETURNING *;
    `;

    const updatedRecord = await db.query(query, [diagnosis, treatment, recordId, doctorId]);

    if (updatedRecord.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Record not found or not authorized to edit this record',
      });
    }

    res.status(200).json({
      success: true,
      record: updatedRecord.rows[0],
    });
  } catch (error) {
    console.error('Error updating patient record:', error);
    res.status(500).json({ success: false, message: 'Error updating record' });
  }
};

