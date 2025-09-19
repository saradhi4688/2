const Course = require('../models/Course');

exports.list = async (req, res) => {
  try {
    const courses = await Course.find().limit(500);
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
