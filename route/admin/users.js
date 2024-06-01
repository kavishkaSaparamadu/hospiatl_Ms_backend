const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/user'); // Adjust the path as necessary
const router = Router();
const authMiddleware = require('../../middlewares/authMiddelware');
const jwt = require('jsonwebtoken');

// Route for registering a new user
router.post('/register', async (req, res) => {
  try {
    const { name, age, gender, address, email, password, role } = req.body;

    // Validate required fields
    if (!name || !age || !gender || !address || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user with the hashed password and role
    const newUser = new User({
      name,
      age,
      gender,
      address,
      email,
      password: hashedPassword,
      role: role || 'patient', // Default to 'patient' if role is not provided
      isDoctor: role === 'doctor', // Set isDoctor flag based on role
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ success: true, message: 'Registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ success: false, message: 'Error registering user: ' + err.message });
  }
});

// Route for logging in a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Respond with token and user role
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      userRole: user.role,
      name: user.name,
    });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ success: false, message: 'Error logging in user: ' + err.message });
  }
});

// Get User Info by ID Route
router.post('/get-user-info-by-id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User does not exist", success: false });
    }

    res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error getting user info", success: false, error });
  }

  
});

module.exports = router;
