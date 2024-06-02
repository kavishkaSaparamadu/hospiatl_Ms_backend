const express = require('express');
const router = express.Router();
const Prescription = require('../../models/prescription');

// Add a new prescription
router.post('/prescription', async (req, res) => {
  const { patientName, doctorName, allergies, description } = req.body;

  try {
    const newPrescription = new Prescription({
      patientName,
      doctorName,
      allergies,
      description
    });

    await newPrescription.save();
    res.json({ success: true, message: 'Prescription Send successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: 'Error: ' + err.message });
  }
});

// Get all prescriptions
router.get('/', async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.json(prescriptions);
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: 'Error: ' + err.message });
  }
});

module.exports = router;
