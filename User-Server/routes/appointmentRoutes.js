const express = require('express');
const { addAvailableHour,updateAvailableHours,getAvailableHours } = require('../controllers/appointmentController'); // Ensure this path is correct

const router = express.Router();

// Define the route for fetching doctors by specialization
router.post('/', addAvailableHour);
router.put('/update/:id', updateAvailableHours);
router.get('/', getAvailableHours);

module.exports = router;
