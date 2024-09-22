const express = require('express');
const { addAvailableHour,updateAvailableHours,getAvailableHours,getAvailableHours_user,bookAppointment,deleteBookedSlots }
 = require('../controllers/appointmentController'); // Ensure this path is correct

const router = express.Router();

// Define the route for fetching doctors by specialization
router.post('/', addAvailableHour);
router.put('/update/:id', updateAvailableHours);
router.get('/', getAvailableHours);
router.get('/getForUser', getAvailableHours_user);
router.post('/book', bookAppointment);
router.delete('/bookedslot', deleteBookedSlots);



module.exports = router;
