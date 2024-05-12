const User = require('../../models/user');


// Controller function for user registration
exports.registerUser = async (req, res) => {
  try {
    const { name, age, gender, address, userRole, email, password } = req.body;
    
    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user instance
    const newUser = new User({
      name,
      age,
      gender,
      address,
      userRole,
      email,
      password
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
