/**
 * Usage:
 * cd backend
 * node seed/seed.js
 *
 * Make sure MONGO_URI is set in env.
 */
const mongoose = require('mongoose');
require('dotenv').config();
const College = require('../models/College');
const Course = require('../models/Course');
const User = require('../models/User');

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/dg';

async function main(){
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to db');

  await College.deleteMany({});
  await Course.deleteMany({});
  await User.deleteMany({});

  const colleges = [
    {
      name: 'Govt. Degree College - Central',
      location: { type: 'Point', coordinates: [78.4867, 17.3850] }, // example: Hyderabad
      address: 'Central Road',
      degrees: ['B.A','B.Sc','B.Com'],
      cutoffs: { 'B.Sc': '60%', 'B.Com': '55%' },
      facilities: ['hostel','library','lab','internet'],
      medium: 'English, Telugu',
      contact: '0123456789'
    },
    {
      name: 'Govt. Arts & Science College - West',
      location: { type: 'Point', coordinates: [78.5, 17.4] },
      address: 'West Road',
      degrees: ['B.A','B.Com'],
      cutoffs: { 'B.A': '50%' },
      facilities: ['library','internet'],
      medium: 'Telugu',
      contact: '0987654321'
    }
  ];

  const courses = [
    {
      title: 'B.Sc - Physics',
      degree: 'B.Sc',
      description: 'Undergraduate degree in Physical Sciences',
      careerPaths: ['Research Assistant','Lab Technician','B.Ed','M.Sc','Government Exams'],
      relatedExams: ['UGC-NET','State PSC'],
      recommendedSkills: ['Mathematics','Physics Labs']
    },
    {
      title: 'B.A - History',
      degree: 'B.A',
      description: 'Undergraduate degree in Humanities',
      careerPaths: ['Teaching','Civil Services','Museums','Journalism'],
      relatedExams: ['State PSC','Civil Services'],
      recommendedSkills: ['Writing','Research']
    },
    {
      title: 'B.Com - Accounting',
      degree: 'B.Com',
      description: 'Undergraduate degree in Commerce',
      careerPaths: ['Accounts','Banking','Business','Auditing'],
      relatedExams: ['CA/ICWA (after further study)','Bank PO'],
      recommendedSkills: ['Mathematics','Accounting']
    }
  ];

  await College.insertMany(colleges);
  await Course.insertMany(courses);
  console.log('Seeded colleges and courses');
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
