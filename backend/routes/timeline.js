const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const TimelineItem = require('../models/TimelineItem');

// GET /api/timeline - user's timeline
router.get('/', auth, async (req, res) => {
  try {
    // basic: return timezone-agnostic upcoming items for user's profile
    const items = await TimelineItem.find({ target: { $in: ['all', req.user.id] } }).sort({ date: 1 }).limit(200);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
