const pool = require('../dbConfig/dbConfig');

class Feedback {
    static async getAll() {
        const result = await pool.query('SELECT * FROM feedback');
        return result.rows;
    }

    // Add methods for create, update, delete as needed
}

module.exports = Feedback;
