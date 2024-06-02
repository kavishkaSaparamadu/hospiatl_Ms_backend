const express = require('express');
const router = express.Router();
const Appointment = require('../../models/appointment');
const Patient = require('../../models/Patient');

// Route for creating a new appointment
router.post('/appointments', async (req, res) => {
  try {
    const { doctorName, selectedDate, patientName } = req.body;
    const appointment = new Appointment({ doctorName, selectedDate, patientName });
    await appointment.save();
    res.status(201).json({ success: true, message: 'Appointment created successfully' });
    
    const unseenNotifications= doctor.unseenNotifications
    unseenNotifications.push({
      type:"new-appointment-request",
      message: 'Appointment created successfully',
      data: {
      PatientId : newPatient._id,
      name: newPatient.name
      },
      onclickPath: "/doctor/appointment"
    })
    await User.findByIdAndUpdate(doctor._id,{unseenNotifications})
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
