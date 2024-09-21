// src/routes/availableHourRoutes.js
const express = require('express');
const AvailableHourController = require('../controllers/AvailableHourController');

const router = express.Router();

router.get('/', AvailableHourController.getAllAvailableHours);
// Add other routes as needed

module.exports = router;
