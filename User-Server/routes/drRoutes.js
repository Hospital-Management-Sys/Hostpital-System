const express = require('express');
const { getDoctorsBySpecialization } = require('../controllers/drController'); 

const router = express.Router();


router.get('/', getDoctorsBySpecialization);

module.exports = router;