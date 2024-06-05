const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfirmedAppointmentSchema = new Schema({
  doctorName: { type: String, required: true },
  selectedDate: { type: Date, required: true },
  patientName: { type: String, required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
});

module.exports = mongoose.model('ConfirmedAppointment', ConfirmedAppointmentSchema);
