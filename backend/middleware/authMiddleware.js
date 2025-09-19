const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

exports.optional = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next(); // proceed as guest

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
  } catch (err) {
    console.warn('Invalid token in optional auth');
  }
  next();
};

exports.required = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, msg: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ success: false, msg: 'Invalid token' });
  }
};
