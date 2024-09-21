const pool = require('../dbConfig/dbConfig');

class AvailableHour {
    static async getAll() {
        const result = await pool.query('SELECT * FROM availablehours');
        return result.rows;
    }

    // Add methods for create, update, delete as needed
}

module.exports = AvailableHour;
