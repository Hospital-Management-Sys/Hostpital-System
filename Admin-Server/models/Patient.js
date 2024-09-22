const pool = require('../dbConfig/dbConfig');

class Patient {
    static async getAll() {
        const result = await pool.query('SELECT * FROM patients');
        return result.rows;
    }

}

module.exports = Patient;
