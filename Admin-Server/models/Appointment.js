const pool = require('../dbConfig/dbConfig');

class Appointment {
    static async getAll() {
        const result = await pool.query('SELECT * FROM appointments');
        return result.rows;
    }

}

module.exports = Appointment;
