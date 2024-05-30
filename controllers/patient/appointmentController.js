const express = require('express');
const router = express.Router();
const Appointment = require('../../models/appointment');

// Route for creating a new appointment
router.post('/appointments', async (req, res) => {
  try {
    const { doctorName, selectedDate, patientName } = req.body;
    const appointment = new Appointment({ doctorName, selectedDate, patientName });
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

module.exports = router;
