// src/routes/paymentRoutes.js
const express = require('express');
const PaymentController = require('../controllers/PaymentController');

const router = express.Router();

router.get('/', PaymentController.getAllPayments);
// Add other routes as needed

module.exports = router;
