import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const topics = {
  'azure-az900': {
    id: 'azure-az900',
    title: 'Azure AZ-900: Microsoft Azure Fundamentals',
    minQuestions: 5,
    maxQuestions: 50,
    defaultQuestions: 15
  }
};

function QuizSetupPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = topics[topicId];
  
  const [questionCount, setQuestionCount] = useState(topic?.defaultQuestions || 15);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartQuiz = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, we would call the backend here to generate quiz
      // For now, we'll simulate a delay and navigate to the quiz page
      setTimeout(() => {
        // Pass quiz data through navigation state
        navigate('/quiz', { 
          state: { 
            topicId,
            questionCount,
            // This would come from the API in the real app
            quizData: simulateQuizData(questionCount)
          } 
        });
      }, 1500);
    } catch (error) {
      console.error('Error starting quiz:', error);
      setIsLoading(false);
    }
  };

  // Simulation function - would be replaced with actual API call
  const simulateQuizData = (count) => {
    const questions = [];
    for (let i = 1; i <= count; i++) {
      questions.push({
        id: i,
        question: `Sample question ${i} for ${topic.title}?`,
        options: [
          `Option A for question ${i}`,
          `Option B for question ${i}`,
          `Option C for question ${i}`,
          `Option D for question ${i}`
        ],
        correctAnswer: Math.floor(Math.random() * 4)
      });
    }
    return { questions };
  };

  if (!topic) {
    return <div>Topic not found</div>;
  }

  return (
    <div>
      <h2>Quiz Setup: {topic.title}</h2>
      <div className="setup-form">
        <div className="form-group">
          <label htmlFor="question-count">Number of Questions:</label>
          <input
            type="number"
            id="question-count"
            value={questionCount}
            onChange={(e) => setQuestionCount(Math.max(topic.minQuestions, Math.min(topic.maxQuestions, parseInt(e.target.value))))}
            min={topic.minQuestions}
            max={topic.maxQuestions}
          />
          <p className="input-hint">Min: {topic.minQuestions}, Max: {topic.maxQuestions}</p>
        </div>
        
        <button onClick={handleStartQuiz} disabled={isLoading}>
          {isLoading ? 'Generating Quiz...' : 'Start Quiz'}
        </button>
      </div>
    </div>
  );
}

export default QuizSetupPage;