// src/controllers/AvailableHourController.js
const AvailableHour = require('../models/AvailableHour');

class AvailableHourController {
    static async getAllAvailableHours(req, res) {
        try {
            const hours = await AvailableHour.getAll();
            res.json(hours);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch available hours' });
        }
    }

    // Add methods for create, update, delete as needed
}

module.exports = AvailableHourController;
