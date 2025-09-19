const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
title: String,
degree: String,
description: String,
careerPaths: [String],
relatedExams: [String],
recommendedSkills: [String]
});
module.exports = mongoose.model('Course', CourseSchema);