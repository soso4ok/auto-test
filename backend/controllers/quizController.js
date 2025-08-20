const quizService = require('../services/quizService');

exports.generateQuiz = async (req, res) => {
  try {
    const { topic, questionCount } = req.body;
    
    if (!topic || !questionCount) {
      return res.status(400).json({ 
        error: 'Missing required parameters: topic and questionCount are required' 
      });
    }
    
    const quiz = await quizService.generateQuiz(topic, questionCount);
    res.json(quiz);
  } catch (error) {
    console.error('Error generating quiz:', error);
    res.status(500).json({ 
      error: 'An error occurred while generating the quiz',
      details: error.message
    });
  }
};