const express = require('express');
const {
  getDoctorsBySpecialization,
  getAllDoctors,
  getDoctorById,
} = require('../controllers/drController');

const router = express.Router();

// Route to get all doctors
router.get('/all', getAllDoctors);

// Route to get doctors by specialization
router.get('/', getDoctorsBySpecialization);

// Route to get a doctor by ID
router.get('/:id', getDoctorById);

module.exports = router;
