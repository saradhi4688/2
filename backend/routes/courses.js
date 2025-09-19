const express = require('express');
const router = express.Router();
const coursesCtrl = require('../controllers/coursesCtrl');

router.get('/', coursesCtrl.list);
router.get('/:id', coursesCtrl.getById);

module.exports = router;
