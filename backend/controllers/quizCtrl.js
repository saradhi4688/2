// backend/controllers/quizCtrl.js
const Quiz = require('../models/Quiz');
const User = require('../models/User');

/**
 * POST /api/quiz/generate
 * Generates AI-based quiz questions (dummy logic, replace with real AI)
 */
exports.generateQuiz = async (req, res) => {
  try {
    const { age, interests } = req.body;

    if (!age || !interests?.length) {
      return res.status(400).json({ success: false, msg: 'Age and interests are required' });
    }

    // ===== Dummy AI logic (replace with real AI API call) =====
    const questions = interests.map((topic, i) => ({
      id: `q${i}`,
      text: `Sample question about ${topic}?`,
      type: 'text',
    }));

    const recommendedStreams = interests.slice(0, 3);

    let quizData = { questions, recommendedStreams };
    let quiz = null;

    // If user is logged in, save quiz to DB
    if (req.user?.id) {
      quiz = new Quiz({ ...quizData, user: req.user.id });
      await quiz.save();

      // Update user's quiz history
      const user = await User.findById(req.user.id);
      if (!user.quizHistory) user.quizHistory = [];
      user.quizHistory.push({ quizId: quiz._id, recommendedStreams });
      await user.save();
    }

    res.json({ success: true, quizId: quiz?._id || null, questions, recommendedStreams });
  } catch (err) {
    console.error('Quiz generation error:', err);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};
