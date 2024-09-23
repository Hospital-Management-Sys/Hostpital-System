const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactusController');

router.post('/submit', submitContactForm);

module.exports = router;