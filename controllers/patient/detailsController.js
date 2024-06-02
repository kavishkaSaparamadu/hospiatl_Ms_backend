const express = require("express");
const router = express.Router();
const Patient = require('../../models/Patient'); // Adjust the path as necessary

// Add a new patient
router.post("/profile", async (req, res) => {
  const {
    name,
    email,
    bloodGroup,
    age,
    currentMedications,
    otherChannelDoctors,
    allergies,
  } = req.body;

  try {
    // Check if email already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const newPatient = new Patient({
      name,
      email,
      bloodGroup,
      age,
      currentMedications,
      otherChannelDoctors,
      allergies,
    });

    await newPatient.save();
    res.json({ success: true, message: "Patient Details Added" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: "Error: " + err.message });
  }
});

// Get all patients
router.get("/", (req, res) => {
  Patient.find()
    .then(patients => {
      res.json(patients);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ success: false, message: "Error: " + err.message });
    });
});

// Approve appointment
router.post('/appointments/:id/approve', async (req, res) => {
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
router.post('/appointments/:id/reject', async (req, res) => {
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

// Get patient details by ID
router.get('/patients/:id', async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    res.status(200).json({ success: true, patient });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch patient details', error: error.message });
  }
});

module.exports = router;
