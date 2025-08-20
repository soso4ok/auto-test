const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generates quiz questions using Gemini AI
 */
exports.generateQuestionsWithAI = async (topicId, topicName, sections, questionsPerSection) => {
  try {
    // Create a structured prompt for the AI
    const prompt = createQuizGenerationPrompt(topicId, topicName, sections, questionsPerSection);
    
    // Get the Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Call the Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResponse = response.text();
    
    // Parse the AI response to extract the quiz questions and answers
    return parseAIResponse(aiResponse);
    
  } catch (error) {
    console.error("Error generating questions with AI:", error);
    
    // Fallback to sample questions if AI fails
    console.log("Falling back to sample questions");
    return generateSampleQuestions(topicId, sections, questionsPerSection);
  }
};

/**
 * Creates a detailed prompt for the AI to generate quiz questions
 */
function createQuizGenerationPrompt(topicId, topicName, sections, questionsPerSection) {
  let prompt = `Generate a quiz for ${topicName} certification exam with the following structure:\n\n`;
  
  // Add details about sections and question counts
  prompt += "Generate questions for these sections with the specified counts:\n";
  questionsPerSection.forEach(section => {
    prompt += `- ${section.name}: ${section.count} questions\n`;
  });
  
  // Add formatting instructions
  prompt += `\nFormat your response as a JSON object with this structure:
  {
    "questions": [
      {
        "section": "Section name",
        "question": "Question text goes here?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswerIndex": 0
      },
      // more questions...
    ]
  }
  
  The correctAnswerIndex should be 0 for option A, 1 for option B, etc.
  Make sure all the questions are accurate for the ${topicName} exam.
  Each question should have exactly 4 options.
  Ensure options are plausible but only one is correct.
  Your response must be valid JSON with no additional text or explanation.
  `;
  
  return prompt;
}

/**
 * Parse the AI-generated response into structured quiz data
 */
function parseAIResponse(aiResponse) {
  try {
    // Extract JSON from the response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not extract JSON from AI response");
    }
    
    const jsonData = JSON.parse(jsonMatch[0]);
    return {
      questions: jsonData.questions,
      answerKey: jsonData.questions.map(q => q.correctAnswerIndex)
    };
  } catch (error) {
    console.error("Error parsing AI response:", error);
    throw new Error("Failed to parse AI-generated quiz data");
  }
}

/**
 * Generates sample questions as a fallback when AI generation fails
 */
function generateSampleQuestions(topicId, sections, questionsPerSection) {
  const questions = [];
  
  questionsPerSection.forEach(sectionInfo => {
    const { name, count } = sectionInfo;
    
    for (let i = 1; i <= count; i++) {
      questions.push({
        section: name,
        question: `Sample question ${i} for section "${name}"?`,
        options: [
          `Correct answer for question ${i}`,
          `Incorrect option B for question ${i}`,
          `Incorrect option C for question ${i}`,
          `Incorrect option D for question ${i}`
        ],
        correctAnswerIndex: 0
      });
    }
  });
  
  return {
    questions,
    answerKey: questions.map(q => q.correctAnswerIndex)
  };
}