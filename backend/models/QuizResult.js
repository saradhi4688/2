const mongoose = require('mongoose');
const QuizResultSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
answers: Array,
scores: Object,
recommendedStreams: [String],
createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('QuizResult', QuizResultSchema);