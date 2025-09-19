// backend/controllers/userCtrl.js
const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    if (!req.user?.id) return res.status(401).json({ msg: 'Unauthorized' });
    const user = await User.findById(req.user.id).select('-passwordHash').populate({
      path: 'quizHistory',
      options: { sort: { createdAt: -1 }, limit: 10 }
    });
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.updateProfile = async (req, res) => {
  try {
    if (!req.user?.id) return res.status(401).json({ msg: 'Unauthorized' });
    const { age, interests } = req.body;
    const update = {};
    if (age !== undefined) update.age = age;
    if (interests !== undefined) update.interests = Array.isArray(interests) ? interests : String(interests).split(',').map(s => s.trim()).filter(Boolean);
    const user = await User.findByIdAndUpdate(req.user.id, update, { new: true }).select('-passwordHash');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
