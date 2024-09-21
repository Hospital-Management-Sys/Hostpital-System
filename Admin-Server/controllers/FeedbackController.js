// src/controllers/FeedbackController.js
const Feedback = require('../models/Feedback');

class FeedbackController {
    static async getAllFeedback(req, res) {
        try {
            const feedback = await Feedback.getAll();
            res.json(feedback);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch feedback' });
        }
    }

    // Add methods for create, update, delete as needed
}

module.exports = FeedbackController;
