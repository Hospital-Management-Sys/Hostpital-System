// src/models/User.js
const pool = require('../dbConfig/dbConfig');

class User {
    static async getAll() {
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    }

}

module.exports = User;
