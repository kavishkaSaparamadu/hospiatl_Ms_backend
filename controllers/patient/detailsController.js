const express = require('express');
const Patient = require('../../models/Patient');
const router = express.Router();

// Controller to handle the profile submission
router.post('/profile', async (req, res) => {
  try {
    const {
      name,
      email,
      bloodGroup,
      age,
      currentMedications,
      otherChannelDoctors,
      allergies,
    } = req.body;

    console.log('Request body:', req.body); // Log the request body

    // Validate required fields
    if (!name || !email || !bloodGroup || !age || !currentMedications || !otherChannelDoctors || !allergies) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }

    // Create a new patient profile
    const newPatient = new Patient({
      name,
      email,
      bloodGroup,
      age,
      currentMedications,
      otherChannelDoctors,
      allergies,
    });

    // Save the profile to the database
    await newPatient.save();

    res.status(201).json({ message: 'Your profile has been submitted successfully', success: true });
  } catch (error) {
    console.error('Error submitting patient profile:', error.message); // Log the error
    res.status(500).json({ message: 'Server Error', success: false, error: error.message });
  }
});

// Route to fetch all patient details
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    if (!patients || patients.length === 0) {
      return res.status(404).json({ message: 'No patients found', success: false });
    }
    res.status(200).json({ patients, success: true });
  } catch (error) {
    console.error('Error fetching patients:', error.message);
    res.status(500).json({ message: 'Server Error', success: false, error: error.message });
  }
});

module.exports = router;
