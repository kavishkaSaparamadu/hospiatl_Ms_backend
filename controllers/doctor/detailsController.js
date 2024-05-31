const Doctor = require('../../models/doctor');
const { Router } = require('express');
const router = Router();



// Controller to handle the doctor application submission
router.post('/apply', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            specialization,
            experience,
            feePerConsultation,
            timings,
            availableDays,
        } = req.body;
  
        console.log('Request body:', req.body); // Log the request body
  
        // Validate required fields
        if (!firstName || !lastName || !email || !phoneNumber || !address || !specialization || !experience || !feePerConsultation || !timings || !availableDays) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }
  
        // Create a new doctor application
        const newDoctor = new Doctor({
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            specialization,
            experience,
            feePerConsultation,
            timings,
            availableDays,
        });
  
        // Save the application to the database
        await newDoctor.save();
  
        res.status(201).json({ message: 'Doctor application submitted successfully', success: true });
    } catch (error) {
        console.error('Error submitting doctor application:', error.message); // Log the error
        res.status(500).json({ message: 'Server Error', success: false, error: error.message });
    }
});

module.exports = router;

// Route to fetch all doctor details
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        if (!doctors || doctors.length === 0) {
            return res.status(404).json({ message: 'No doctors found', success: false });
        }
        res.status(200).json({ doctors, success: true });
    } catch (error) {
        console.error('Error fetching doctors:', error.message);
        res.status(500).json({ message: 'Server Error', success: false, error: error.message });
    }
});



module.exports = router;
