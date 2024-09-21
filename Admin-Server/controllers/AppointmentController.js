// src/controllers/AppointmentController.js
const Appointment = require('../models/Appointment');

class AppointmentController {
    static async getAllAppointments(req, res) {
        try {
            const appointments = await Appointment.getAll();
            res.json(appointments);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch appointments' });
        }
    }

    // Add methods for create, update, delete as needed
}

module.exports = AppointmentController;
