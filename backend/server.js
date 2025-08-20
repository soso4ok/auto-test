const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const quizRoutes = require('./routes/quizRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/quiz', quizRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Quiz App API is running');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});