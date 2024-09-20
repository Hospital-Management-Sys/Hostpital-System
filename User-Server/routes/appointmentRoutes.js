const express = require('express');
const router = express.Router();
const { createAppointment, getAppointmentsForDoctor } = require('../controllers/appointmentController');

// Routes for managing appointments
router.post('/appointments', createAppointment);
router.get('/doctors/:doctorId/appointments', getAppointmentsForDoctor);

module.exports = router;
