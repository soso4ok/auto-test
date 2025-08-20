// Main application logic
class QuizApp {
    constructor() {
        this.currentTopic = null;
        this.currentQuiz = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.quizResults = null;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.showPage('home');
    }

    bindEvents() {
        // Topic selection
        document.querySelectorAll('.select-topic-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const topicCard = e.target.closest('.topic-card');
                const topic = topicCard.dataset.topic;
                this.selectTopic(topic);
            });
        });

        // Quiz setup
        document.getElementById('start-quiz-btn').addEventListener('click', () => {
            this.startQuiz();
        });

        document.getElementById('back-to-home-btn').addEventListener('click', () => {
            this.showPage('home');
        });

        // Quiz navigation
        document.getElementById('prev-question-btn').addEventListener('click', () => {
            this.previousQuestion();
        });

        document.getElementById('next-question-btn').addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('finish-quiz-btn').addEventListener('click', () => {
            this.finishQuiz();
        });

        // Results actions
        document.getElementById('retake-quiz-btn').addEventListener('click', () => {
            this.retakeQuiz();
        });

        document.getElementById('new-topic-btn').addEventListener('click', () => {
            this.showPage('home');
        });
    }

    showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(`${pageId}-page`).classList.add('active');
    }

    showLoading(show = true) {
        const overlay = document.getElementById('loading-overlay');
        if (show) {
            overlay.classList.add('active');
        } else {
            overlay.classList.remove('active');
        }
    }

    selectTopic(topic) {
        this.currentTopic = topic;
        const topicConfig = QUIZ_TOPICS[topic];
        
        if (topicConfig) {
            document.getElementById('setup-title').textContent = `${topicConfig.title} Quiz Setup`;
            this.showPage('setup');
        }
    }

    async startQuiz() {
        const questionCount = parseInt(document.getElementById('question-count').value);
        
        if (questionCount < 5 || questionCount > 50) {
            alert('Please enter a number between 5 and 50');
            return;
        }

        this.showLoading(true);

        try {
            this.currentQuiz = await AIService.generateQuiz(this.currentTopic, questionCount);
            this.userAnswers = {};
            this.currentQuestionIndex = 0;
            
            this.showLoading(false);
            this.showPage('quiz');
            this.displayQuestion();
        } catch (error) {
            this.showLoading(false);
            alert(`Error generating quiz: ${error.message}`);
        }
    }

    displayQuestion() {
        if (!this.currentQuiz) return;

        const allQuestions = this.getAllQuestions();
        const question = allQuestions[this.currentQuestionIndex];
        
        if (!question) return;

        // Update quiz header
        document.getElementById('quiz-title').textContent = this.currentQuiz.quiz_title;
        document.getElementById('question-counter').textContent = 
            `Question ${this.currentQuestionIndex + 1} of ${allQuestions.length}`;
        
        // Update progress bar
        const progress = ((this.currentQuestionIndex + 1) / allQuestions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;

        // Find which section this question belongs to
        const sectionInfo = this.findQuestionSection(question.id);
        document.getElementById('current-section').textContent = 
            `Section: ${sectionInfo.section_title}`;

        // Display question
        document.getElementById('question-text').textContent = question.question_text;
        
        // Display options
        const optionsContainer = document.getElementById('question-options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.dataset.value = this.getOptionLetter(index);
            
            // Check if this option was previously selected
            if (this.userAnswers[question.id] === this.getOptionLetter(index)) {
                optionElement.classList.add('selected');
            }
            
            optionElement.addEventListener('click', () => {
                this.selectOption(question.id, this.getOptionLetter(index), optionElement);
            });
            
            optionsContainer.appendChild(optionElement);
        });

        // Update navigation buttons
        this.updateNavigationButtons();
    }

    getAllQuestions() {
        if (!this.currentQuiz) return [];
        
        const allQuestions = [];
        this.currentQuiz.sections.forEach(section => {
            allQuestions.push(...section.questions);
        });
        return allQuestions;
    }

    findQuestionSection(questionId) {
        for (const section of this.currentQuiz.sections) {
            for (const question of section.questions) {
                if (question.id === questionId) {
                    return section;
                }
            }
        }
        return null;
    }

    getOptionLetter(index) {
        return String.fromCharCode(97 + index); // 'a', 'b', 'c', 'd'
    }

    selectOption(questionId, optionValue, optionElement) {
        // Remove previous selection
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Add selection to clicked option
        optionElement.classList.add('selected');
        
        // Store user answer
        this.userAnswers[questionId] = optionValue;
        
        // Enable next button
        this.updateNavigationButtons();
    }

    updateNavigationButtons() {
        const allQuestions = this.getAllQuestions();
        const prevBtn = document.getElementById('prev-question-btn');
        const nextBtn = document.getElementById('next-question-btn');
        const finishBtn = document.getElementById('finish-quiz-btn');
        
        // Previous button
        prevBtn.disabled = this.currentQuestionIndex === 0;
        
        // Next/Finish button
        const currentQuestion = allQuestions[this.currentQuestionIndex];
        const hasAnswer = currentQuestion && this.userAnswers[currentQuestion.id];
        
        if (this.currentQuestionIndex === allQuestions.length - 1) {
            nextBtn.style.display = 'none';
            finishBtn.style.display = hasAnswer ? 'inline-block' : 'none';
            finishBtn.disabled = !hasAnswer;
        } else {
            nextBtn.style.display = 'inline-block';
            finishBtn.style.display = 'none';
            nextBtn.disabled = !hasAnswer;
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }

    nextQuestion() {
        const allQuestions = this.getAllQuestions();
        if (this.currentQuestionIndex < allQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        }
    }

    finishQuiz() {
        this.calculateResults();
        this.displayResults();
        this.showPage('results');
    }

    calculateResults() {
        const allQuestions = this.getAllQuestions();
        let totalCorrect = 0;
        const sectionResults = {};

        // Initialize section results
        this.currentQuiz.sections.forEach(section => {
            sectionResults[section.section_title] = {
                correct: 0,
                total: section.questions.length
            };
        });

        // Check each answer
        allQuestions.forEach(question => {
            const userAnswer = this.userAnswers[question.id];
            const correctAnswer = this.currentQuiz.answer_key[question.id];
            const isCorrect = userAnswer === correctAnswer;
            
            if (isCorrect) {
                totalCorrect++;
            }

            // Update section results
            const section = this.findQuestionSection(question.id);
            if (section && isCorrect) {
                sectionResults[section.section_title].correct++;
            }
        });

        this.quizResults = {
            totalQuestions: allQuestions.length,
            totalCorrect: totalCorrect,
            percentage: Math.round((totalCorrect / allQuestions.length) * 100),
            sectionResults: sectionResults,
            questions: allQuestions.map(question => ({
                ...question,
                userAnswer: this.userAnswers[question.id],
                correctAnswer: this.currentQuiz.answer_key[question.id],
                isCorrect: this.userAnswers[question.id] === this.currentQuiz.answer_key[question.id],
                section: this.findQuestionSection(question.id).section_title
            }))
        };
    }

    displayResults() {
        if (!this.quizResults) return;

        // Display score
        document.getElementById('score-percentage').textContent = `${this.quizResults.percentage}%`;
        document.getElementById('score-fraction').textContent = 
            `${this.quizResults.totalCorrect}/${this.quizResults.totalQuestions} Correct`;

        // Display section breakdown
        const sectionResultsContainer = document.getElementById('section-results');
        sectionResultsContainer.innerHTML = '';
        
        Object.entries(this.quizResults.sectionResults).forEach(([sectionTitle, results]) => {
            const percentage = results.total > 0 ? Math.round((results.correct / results.total) * 100) : 0;
            
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'section-result';
            sectionDiv.innerHTML = `
                <span>${sectionTitle}</span>
                <span>${results.correct}/${results.total} (${percentage}%)</span>
            `;
            sectionResultsContainer.appendChild(sectionDiv);
        });

        // Display question review
        const questionReviewContainer = document.getElementById('question-review');
        questionReviewContainer.innerHTML = '';
        
        this.quizResults.questions.forEach((question, index) => {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = `question-review-item ${question.isCorrect ? 'correct' : 'incorrect'}`;
            
            const correctOption = question.options.find(opt => 
                opt.startsWith(question.correctAnswer + ')')
            );
            const userOption = question.options.find(opt => 
                opt.startsWith(question.userAnswer + ')')
            );
            
            reviewDiv.innerHTML = `
                <div class="review-question">
                    ${index + 1}. ${question.question_text}
                </div>
                <div class="review-answers">
                    <div class="review-answer correct-answer">
                        Correct: ${correctOption || question.correctAnswer}
                    </div>
                    ${!question.isCorrect ? `
                        <div class="review-answer user-answer incorrect">
                            Your answer: ${userOption || question.userAnswer}
                        </div>
                    ` : ''}
                </div>
            `;
            
            questionReviewContainer.appendChild(reviewDiv);
        });
    }

    retakeQuiz() {
        this.showPage('setup');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});