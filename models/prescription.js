const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  allergies: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
 