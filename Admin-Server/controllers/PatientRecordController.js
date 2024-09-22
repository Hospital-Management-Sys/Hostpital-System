// src/controllers/PatientRecordController.js
const PatientRecord = require('../models/PatientRecord');

class PatientRecordController {
    static async getAllRecords(req, res) {
        try {
            const records = await PatientRecord.getAll();
            res.json(records);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch patient records' });
        }
    }

    // Add methods for create, update, delete as needed
}

module.exports = PatientRecordController;
