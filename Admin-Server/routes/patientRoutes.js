const express = require('express');
const PatientController = require('../controllers/PatientController');

const router = express.Router();

router.get('/', PatientController.getAllPatients);

module.exports = router;
