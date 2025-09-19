const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/auth', require('./routes/auth')); // Auth routes if exists

// MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quizapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
