const express = require('express');
const { addAvailableHours,updateAvailableHours,getAvailableHours,getAvailableHours_user,bookAppointment,deleteBookedSlots }
 = require('../controllers/appointmentController'); // Ensure this path is correct

const router = express.Router();

// Define the route for fetching doctors by specialization
router.post('/', addAvailableHours);
router.get('/get',getAvailableHours);
router.post('/book',bookAppointment)
// router.put('/update/:id', updateAvailableHours);
// router.get('/', getAvailableHours);
// router.get('/getForUser', getAvailableHours_user);
// router.post('/book', bookAppointment);
// router.delete('/bookedslot', deleteBookedSlots);



module.exports = router;