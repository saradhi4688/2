const express = require('express');
const router = express.Router();
const collegesCtrl = require('../controllers/collegesCtrl');

// GET /api/colleges?lat=&lon=&radius= (radius in kms)
router.get('/', collegesCtrl.list);

// GET /api/colleges/:id
router.get('/:id', collegesCtrl.getById);

module.exports = router;
