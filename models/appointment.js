const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true
  },
  selectedDate: {
    type: Date,
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  userDiseases: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
