const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authCtrl'); // this is an object with functions
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/register', authCtrl.register); // ✅ function reference
router.post('/login', authCtrl.login);       // ✅ function reference

// Protected route
router.get('/profile', authMiddleware.required, authCtrl.getProfile); // ✅ function reference

module.exports = router;
