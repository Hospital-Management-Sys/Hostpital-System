const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');

const adminController = {
    async login(req, res) {
        const { name, password } = req.body;
        const admin = await Admin.findByName(name);

        if (admin) {
            if (admin.password === password) {
                res.status(200).json({ message: 'Login successful', adminId: admin.admin_id });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    },
};

module.exports = adminController;

