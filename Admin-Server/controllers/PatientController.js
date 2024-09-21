const Patient = require('../models/Patient');

class PatientController {
    static async getAllPatients(req, res) {
        try {
            const patients = await Patient.getAll();
            res.json(patients);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch patients' });
        }
    }

}

module.exports = PatientController;
