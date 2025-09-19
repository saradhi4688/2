const mongoose = require('mongoose');
const TimelineItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  type: String, // 'admission', 'scholarship', 'exam', etc
  target: { type: [String], default: ['all'] } // 'all' or specific user ids
});
module.exports = mongoose.model('TimelineItem', TimelineItemSchema);
