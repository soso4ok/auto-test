// AI Service simulation
class AIService {
    /**
     * Generate a quiz based on topic and number of questions
     * @param {string} topic - The topic identifier (e.g., 'azure-az900')
     * @param {number} questionCount - Number of questions to generate
     * @returns {Promise<Object>} - Quiz data in the specified format
     */
    static async generateQuiz(topic, questionCount) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
        
        const topicConfig = QUIZ_TOPICS[topic];
        if (!topicConfig) {
            throw new Error(`Topic '${topic}' not found`);
        }

        const sampleQuestions = SAMPLE_QUESTIONS[topic];
        if (!sampleQuestions) {
            throw new Error(`No questions available for topic '${topic}'`);
        }

        // Calculate questions per section based on weights
        const questionsPerSection = this.calculateQuestionsPerSection(topicConfig.sections, questionCount);
        
        const quiz = {
            quiz_title: `${topicConfig.title} Practice Quiz`,
            sections: [],
            answer_key: {}
        };

        let questionId = 1;

        // Generate questions for each section
        for (let i = 0; i < topicConfig.sections.length; i++) {
            const section = topicConfig.sections[i];
            const sectionQuestions = sampleQuestions[section.title] || [];
            const numQuestions = questionsPerSection[i];
            
            if (sectionQuestions.length === 0) continue;

            const selectedQuestions = this.selectRandomQuestions(sectionQuestions, numQuestions);
            
            const quizSection = {
                section_title: section.description,
                questions: selectedQuestions.map(q => ({
                    id: questionId++,
                    question_text: q.question_text,
                    options: q.options
                }))
            };

            quiz.sections.push(quizSection);

            // Build answer key
            for (let j = 0; j < selectedQuestions.length; j++) {
                const questionIdForAnswer = questionId - selectedQuestions.length + j;
                quiz.answer_key[questionIdForAnswer] = selectedQuestions[j].correct_answer;
            }
        }

        return quiz;
    }

    /**
     * Calculate how many questions each section should have based on weights
     */
    static calculateQuestionsPerSection(sections, totalQuestions) {
        const questionsPerSection = sections.map(section => 
            Math.round(section.weight * totalQuestions)
        );

        // Adjust for rounding errors to ensure total matches
        const currentTotal = questionsPerSection.reduce((sum, count) => sum + count, 0);
        const difference = totalQuestions - currentTotal;

        if (difference !== 0) {
            // Add or subtract from the largest section
            const maxIndex = questionsPerSection.indexOf(Math.max(...questionsPerSection));
            questionsPerSection[maxIndex] += difference;
        }

        return questionsPerSection;
    }

    /**
     * Select random questions from a pool
     */
    static selectRandomQuestions(questionPool, count) {
        if (questionPool.length <= count) {
            return [...questionPool];
        }

        const shuffled = [...questionPool];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled.slice(0, count);
    }

    /**
     * Validate quiz response format
     */
    static validateQuizFormat(quiz) {
        if (!quiz.quiz_title || !quiz.sections || !quiz.answer_key) {
            throw new Error('Invalid quiz format: missing required fields');
        }

        if (!Array.isArray(quiz.sections)) {
            throw new Error('Invalid quiz format: sections must be an array');
        }

        for (const section of quiz.sections) {
            if (!section.section_title || !section.questions) {
                throw new Error('Invalid quiz format: section missing required fields');
            }

            if (!Array.isArray(section.questions)) {
                throw new Error('Invalid quiz format: section questions must be an array');
            }

            for (const question of section.questions) {
                if (!question.id || !question.question_text || !question.options) {
                    throw new Error('Invalid quiz format: question missing required fields');
                }

                if (!Array.isArray(question.options)) {
                    throw new Error('Invalid quiz format: question options must be an array');
                }
            }
        }

        return true;
    }
}