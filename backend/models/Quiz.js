const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  questions: [{ 
    id: String, 
    text: String, 
    type: String 
  }],
  recommendedStreams: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quiz', quizSchema);
