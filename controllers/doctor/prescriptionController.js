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
    res.json({ success: true, message: 'Prescription sent successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: 'Error: ' + err.message });
  }
});

// Get all prescriptions
router.get('/prescriptions', async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.json(prescriptions);
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: 'Error: ' + err.message });
  }
});

// Delete a prescription
router.delete('/prescriptions/:id', async (req, res) => {
  try {
    await Prescription.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Prescription deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: 'Error: ' + err.message });
  }
});

module.exports = router;
