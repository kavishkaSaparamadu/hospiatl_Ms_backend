const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  currentMedications: {
    type: String,
    required: true,
  },
  otherChannelDoctors: {
    type: String,
    required: true,
  },
  allergies: {
    type: String,
    required: true,
  },
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
