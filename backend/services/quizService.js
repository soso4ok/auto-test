const { generateQuestionsWithAI } = require('./aiService');

// Topic metadata and structure
const topics = {
  'azure-az900': {
    name: 'Azure AZ-900: Microsoft Azure Fundamentals',
    sections: [
      { name: 'Describe cloud concepts', weight: 27.5 },  // Average of 25-30%
      { name: 'Describe Azure architecture and services', weight: 37.5 },  // Average of 35-40%
      { name: 'Describe Azure management and governance', weight: 32.5 }  // Average of 30-35%
    ]
  }
};

/**
 * Generates a quiz for a specific topic with the specified number of questions
 */
exports.generateQuiz = async (topicId, questionCount) => {
  // Validate topic exists
  const topic = topics[topicId];
  if (!topic) {
    throw new Error(`Topic "${topicId}" not found`);
  }

  // Calculate questions per section based on weights
  const questionsPerSection = distributeQuestionsByWeight(topic.sections, questionCount);
  
  // Generate questions for each section
  const quizData = await generateQuestionsWithAI(topicId, topic.name, topic.sections, questionsPerSection);
  
  return {
    topic: topicId,
    topicName: topic.name,
    questions: quizData.questions,
    answerKey: quizData.answerKey
  };
};

/**
 * Distributes the total number of questions among sections based on their weights
 */
function distributeQuestionsByWeight(sections, totalQuestions) {
  const totalWeight = sections.reduce((sum, section) => sum + section.weight, 0);
  
  // First pass: Calculate questions per section based on weight
  const initialDistribution = sections.map(section => {
    const exactCount = (section.weight / totalWeight) * totalQuestions;
    return {
      name: section.name,
      count: Math.floor(exactCount),  // Floor to ensure we don't exceed total
      remainder: exactCount % 1  // Save the fractional part for second pass
    };
  });
  
  // Calculate how many questions still need to be allocated
  const allocatedQuestions = initialDistribution.reduce((sum, section) => sum + section.count, 0);
  const remainingQuestions = totalQuestions - allocatedQuestions;
  
  // Second pass: Distribute remaining questions based on highest remainder
  if (remainingQuestions > 0) {
    // Sort by remainder in descending order
    const sortedByRemainder = [...initialDistribution]
      .sort((a, b) => b.remainder - a.remainder);
    
    // Allocate remaining questions
    for (let i = 0; i < remainingQuestions; i++) {
      sortedByRemainder[i % sortedByRemainder.length].count++;
    }
  }
  
  // Return the final distribution
  return initialDistribution.map(section => ({
    name: section.name,
    count: section.count
  }));
}