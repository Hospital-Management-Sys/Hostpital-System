const express = require('express');
const router = express.Router();
const { createRecord, getRecordsForDoctor, getRecordsByPatientId, updateRecord } = require('../controllers/recordController');


// POST route to create a new patient record
router.post('/doctors/:doctorId/patient-records',  createRecord);

// GET route to retrieve all records for a specific doctor
router.get('/doctors/:doctorId/patient-records',  getRecordsForDoctor);

// GET route to retrieve records for a specific patient by patient_id
router.get('/patient-records/:patientId',  getRecordsByPatientId);

// PUT route to update a specific patient record
router.put('/patient-records/:recordId',  updateRecord);

module.exports = router;
