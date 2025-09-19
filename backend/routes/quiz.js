// backend/routes/quiz.js
const express = require('express');
const router = express.Router();
const quizCtrl = require('../controllers/quizCtrl');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/quiz/generate
// Works for both guest and logged-in users
router.post('/generate', authMiddleware.optional, quizCtrl.generateQuiz);

module.exports = router;
