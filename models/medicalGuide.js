const mongoose = require('mongoose');

// Define patient schema
const PatientGuidSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  patientAge: {
    type: Number,
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Patient model
const PatientGuid = mongoose.model('PatientGuid', PatientGuidSchema);

module.exports = PatientGuid;
