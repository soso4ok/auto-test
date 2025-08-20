const express = require('express');
const quizController = require('../controllers/quizController');

const router = express.Router();

// Generate a quiz for a specific topic
router.post('/generate', quizController.generateQuiz);

module.exports = router;