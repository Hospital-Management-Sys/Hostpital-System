const pool = require('../dbConfig/dbConfig');

const Admin = {
    async findByName(name) {
        const res = await pool.query('SELECT * FROM Admin WHERE name = $1', [name]);
        return res.rows[0];
    },
};

module.exports = Admin;
