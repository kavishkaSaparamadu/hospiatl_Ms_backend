const express = require('express');
const router = express.Router();
const Appointment = require('../../models/appointment');
const ConfirmedAppointment = require('../../models/comfomeAppoiment'); // Assuming this is another model you need
const Patient = require('../../models/Patient');

// Route for creating a new appointment
router.post('/appointment', async (req, res) => {
  try {
    const { doctorName, selectedDate, patientName, userDiseases } = req.body;
    const appointment = new Appointment({ doctorName, selectedDate, patientName, userDiseases });
    await appointment.save();
    res.status(201).json({ success: true, message: 'Appointment created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create appointment', error: error.message });
  }
});

// Route for getting all appointments
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch appointments', error: error.message });
  }
});

// Route for approving an appointment
router.post('/appointment/approve/:id', async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    appointment.status = 'approved';
    await appointment.save();

    res.status(200).json({ success: true, message: 'Appointment approved' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to approve appointment', error: error.message });
  }
});

// Reject appointment
router.post('/appointment/reject/:id', async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    appointment.status = 'rejected';
    await appointment.save();

    res.status(200).json({ success: true, message: 'Appointment rejected' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to reject appointment', error: error.message });
  }
});

// Route for getting all confirmed appointments
router.get('/appointments/approved/:id', async (req, res) => { // Updated
  try {
    const patientId = req.params.patientId;
    const confirmedAppointments = await Appointment.find({ patientId, status: 'approved' });
    res.status(200).json({ success: true, confirmedAppointments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch confirmed appointments', error: error.message });
  }
});


router.get('/appointmen/rejected/:id', async (req, res) => { // Updated
  try {
    const patientId = req.params.patientId;
    const RejectdAppointments = await Appointment.find({ patientId, status: 'Reject' });
    res.status(200).json({ success: true, RejectdAppointments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch Reject appointments', error: error.message });
  }
});
// Route for deleting a confirmed appointment
router.delete('/appoiments/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: 'Error: ' + err.message });
  }
});

module.exports = router;
