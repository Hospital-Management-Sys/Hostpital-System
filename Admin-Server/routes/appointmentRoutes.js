// src/routes/appointmentRoutes.js
const express = require('express');
const AppointmentController = require('../controllers/AppointmentController');

const router = express.Router();

router.get('/', AppointmentController.getAllAppointments);
// Add other routes as needed

module.exports = router;
