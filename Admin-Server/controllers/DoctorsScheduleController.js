// src/controllers/DoctorsScheduleController.js
const DoctorsSchedule = require('../models/DoctorsSchedule');

class DoctorsScheduleController {
    static async getAllSchedules(req, res) {
        try {
            const schedules = await DoctorsSchedule.getAll();
            res.json(schedules);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch doctor schedules' });
        }
    }

    // Add methods for create, update, delete as needed
}

module.exports = DoctorsScheduleController;
