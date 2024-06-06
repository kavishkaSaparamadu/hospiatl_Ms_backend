const { Router } = require('express');
const router = Router();
const MedicalGuide = require('../../models/medicalGuide');


// Route to handle creating a new medical guide record
router.post('/line', async (req, res) => {
    try {
        // Extract medical guide data from request body
        const {
            patientName,
            patientAge,
            diagnosis,
            doctorName
        } = req.body;

        // Create a new medical guide record
        const newMedicalGuide = new MedicalGuide({
            patientName,
            patientAge,
            diagnosis,
            doctorName
        });

        // Save the new medical guide record to the database
        await newMedicalGuide.save();

        // Return success response
        res.status(201).json({ message: 'Medical guide record created successfully', data: newMedicalGuide });
    } catch (error) {
        // Return error response if there's an error
        res.status(500).json({ message: 'Error creating medical guide record', error: error.message });
    }
});

// Route to handle getting all medical guide records
router.get('/guid/line', async (req, res) => {
    try {
        // Retrieve all medical guide records from the database
        const medicalGuides = await MedicalGuide.find();

        // Return success response with the retrieved medical guide records
        res.status(200).json({ data: medicalGuides });
    } catch (error) {
        // Return error response if there's an error
        res.status(500).json({ message: 'Error retrieving medical guide records', error: error.message });
    }
});

module.exports = router;
