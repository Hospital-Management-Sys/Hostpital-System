const pool = require('../dbConfig/dbConfig');

class PatientRecord {
    static async getAll() {
        const result = await pool.query('SELECT * FROM patientrecords');
        return result.rows;
    }

}

module.exports = PatientRecord;
