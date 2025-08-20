# AI-Powered Quiz Application

An intelligent web application for professional certification exam preparation that generates practice quizzes using AI technology.

## Features

- **AI-Powered Question Generation**: Dynamic quiz creation based on selected topics and sections
- **Topic-Based Organization**: Currently supports Azure AZ-900 with expandable architecture
- **Weighted Section Support**: Questions distributed according to real exam proportions
- **Interactive Quiz Interface**: Clean, responsive design with progress tracking
- **Comprehensive Results**: Detailed scoring with section breakdown and question review
- **Immediate Feedback**: Built-in answer checking with explanations

## Supported Exams

### Azure AZ-900: Microsoft Azure Fundamentals
- **Cloud concepts** (25-30%)
- **Azure architecture and services** (35-40%)  
- **Azure management and governance** (30-35%)

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/soso4ok/auto-test.git
   cd auto-test
   ```

2. Start the application:
   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:8000`

## Usage

1. **Select Topic**: Choose an exam topic from the home page
2. **Configure Quiz**: Set the desired number of questions (5-50)
3. **Take Quiz**: Answer questions with immediate navigation controls
4. **Review Results**: View detailed performance breakdown and question review

## Architecture

### Core Components

- **`index.html`**: Main application structure and UI
- **`style.css`**: Responsive styling and visual design
- **`script.js`**: Main application logic and state management
- **`ai-service.js`**: AI integration and quiz generation
- **`quiz-data.js`**: Topic configurations and sample questions

### Data Format

The application uses a structured JSON format for AI communication:

```json
{
  "quiz_title": "Azure AZ-900 Practice Quiz",
  "sections": [
    {
      "section_title": "Describe cloud concepts (25-30%)",
      "questions": [
        {
          "id": 1,
          "question_text": "Question text here...",
          "options": ["a) Option 1", "b) Option 2", "c) Option 3", "d) Option 4"]
        }
      ]
    }
  ],
  "answer_key": {
    "1": "b"
  }
}
```

## Extending the Application

### Adding New Topics

1. Update `QUIZ_TOPICS` in `quiz-data.js` with new topic configuration
2. Add sample questions to `SAMPLE_QUESTIONS`
3. Update the home page HTML to include the new topic card

### AI Integration

The `AIService` class can be extended to integrate with real AI services:
- Replace the simulation in `generateQuiz()` with actual AI API calls
- Maintain the same JSON response format for compatibility

## Development

- **Framework**: Vanilla JavaScript (no external dependencies)
- **Styling**: CSS3 with responsive design
- **Server**: Simple HTTP server for development
- **Browser Support**: Modern browsers with ES6+ support

## License

ISC