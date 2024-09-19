// src/routes/patientRecordRoutes.js
const express = require('express');
const PatientRecordController = require('../controllers/PatientRecordController');

const router = express.Router();

router.get('/', PatientRecordController.getAllRecords);
// Add other routes as needed

module.exports = router;
