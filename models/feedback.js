const mongoose = require('mongoose');

// Define the schema for feedback
const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  message: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true // Automatically create createdAt and updatedAt fields
});

// Create the model from the schema
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
