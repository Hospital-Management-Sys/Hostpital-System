const pool = require('../dbConfig/dbConfig');



const Doctor = {
    create: async (specialization, years_of_experience, contact_number) => {
        const result = await pool.query(
            'INSERT INTO Doctors (specialization, years_of_experience, contact_number) VALUES ($1, $2, $3) RETURNING *',
            [specialization, years_of_experience, contact_number]
        );
        return result.rows[0];
    },

    getAll: async () => {
        const result = await pool.query('SELECT * FROM Doctors');
        return result.rows;
    },

    getById: async (id) => {
        const result = await pool.query('SELECT * FROM Doctors WHERE user_id = $1', [id]);
        return result.rows[0];
    },

    update: async (id, specialization, years_of_experience, contact_number) => {
        const result = await pool.query(
            'UPDATE Doctors SET specialization = $1, years_of_experience = $2, contact_number = $3, updated_at = CURRENT_TIMESTAMP WHERE user_id = $4 RETURNING *',
            [specialization, years_of_experience, contact_number, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await pool.query('DELETE FROM Doctors WHERE user_id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
};

module.exports = Doctor;
