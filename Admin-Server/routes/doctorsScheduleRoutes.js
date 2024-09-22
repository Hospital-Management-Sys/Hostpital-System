// src/routes/doctorsScheduleRoutes.js
const express = require('express');
const DoctorsScheduleController = require('../controllers/DoctorsScheduleController');

const router = express.Router();

router.get('/', DoctorsScheduleController.getAllSchedules);
// Add other routes as needed

module.exports = router;
