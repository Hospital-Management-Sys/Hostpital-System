// src/controllers/PaymentController.js
const Payment = require('../models/Payment');

class PaymentController {
    static async getAllPayments(req, res) {
        try {
            const payments = await Payment.getAll();
            res.json(payments);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch payments' });
        }
    }

    // Add methods for create, update, delete as needed
}

module.exports = PaymentController;
