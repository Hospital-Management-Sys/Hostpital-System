const express = require('express');
const router = express.Router();
const {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
} = require('../controllers/doctorController');

router.post('/', createDoctor);
router.get('/', getAllDoctors);  // This line fetches all doctors
router.get('/:id', getDoctorById);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);

module.exports = router;
