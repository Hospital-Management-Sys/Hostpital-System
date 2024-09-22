// src/routes/feedbackRoutes.js
const express = require('express');
const FeedbackController = require('../controllers/FeedbackController');

const router = express.Router();

router.get('/', FeedbackController.getAllFeedback);
// Add other routes as needed

module.exports = router;
