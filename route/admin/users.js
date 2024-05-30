const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/user'); // Adjust the path as necessary
const router = Router();
const authMiddleware = require('../../middlewares/authMiddelware');
const jwt = require('jsonwebtoken');
const Doctor = require('../../models/doctor');

const generateUserId = async (role) => {
  let prefix = role === 'doctor' ? 'D' : 'P';
  let userId;
  let userExists = true;

  while (userExists) {
    userId = prefix + Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number with the prefix
    userExists = await User.findOne({ userId });
  }

  return userId;
};

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

    // Find the latest user with the same prefix to determine the sequential number
    const latestUser = await User.findOne({ role }).sort({ createdAt: -1 });

    // Generate the sequential number
    let seqNumber = 1;
    if (latestUser && latestUser.userId) {
      const latestSeqNumber = parseInt(latestUser.userId.substring(1)); // Extract the number part and convert to integer
      if (!isNaN(latestSeqNumber)) {
        seqNumber = latestSeqNumber + 1;
      }
    }

    // Generate the userId with the prefix and sequential number
    const userId = `${role.charAt(0)}${seqNumber.toString().padStart(4, '0')}`;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user with the hashed password and custom ID
    const newUser = new User({
      userId,
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
    console.log(req.body);

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
      expiresIn: '1d', // Corrected typo
    });

    // Respond with token and user role
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      userRole: user.role, // Assuming role is stored in the user document
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
    const user = await User.findById(req.user._id); // Corrected to use the ID from token payload
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
    res.status(500).json({ message: "Error Getting User info", success: false, error });
  }
});


module.exports = router;
