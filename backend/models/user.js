const mongoose = require('mongoose');

const quizHistorySchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  recommendedStreams: [String],
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
  gender: String,
  classLevel: String,
  interests: [String],
  quizHistory: [quizHistorySchema],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
