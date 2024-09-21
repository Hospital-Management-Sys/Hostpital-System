const pool = require('../dbConfig/dbConfig');

class Payment {
    static async getAll() {
        const result = await pool.query('SELECT * FROM payments');
        return result.rows;
    }

}

module.exports = Payment;
