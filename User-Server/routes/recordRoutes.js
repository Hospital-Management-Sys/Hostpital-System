const express = require('express');
const router = express.Router();
const doctorRecordsController = require('../controllers/recordController');

// Get all records for the doctor
router.get('/:doctorId/patient-records', doctorRecordsController.getDoctorRecords);

// Add a new patient record
router.post('/:doctorId/records', doctorRecordsController.addPatientRecord);

// Edit an existing patient record
router.put('/:doctorId/records/:recordId', doctorRecordsController.editPatientRecord);

module.exports = router;