const pool = require('../dbConfig/dbConfig');

class DoctorsSchedule {
    static async getAll() {
        const result = await pool.query('SELECT * FROM doctorsschedules');
        return result.rows;
    }

    // Add methods for create, update, delete as needed
}

module.exports = DoctorsSchedule;
