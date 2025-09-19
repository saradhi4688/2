const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, msg: 'All fields are required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, msg: 'Email already registered' });

    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));

    const user = new User({ name, email, password: hash });
    await user.save();

    const token = jwt.sign({ user: { id: user._id } }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Register error', err);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, msg: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, msg: 'Invalid credentials' });

    const token = jwt.sign({ user: { id: user._id } }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error', err);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// PROFILE
exports.getProfile = async (req, res) => {
  try {
    console.log('req.user:', req.user);
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ success: false, msg: 'User not found' });

    // Ensure quizHistory is always returned as array
    const profile = {
      ...user.toObject(),
      quizHistory: user.quizHistory || [],
    };

    res.json({ success: true, user: profile });
  } catch (err) {
    console.error('Profile error', err);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};
