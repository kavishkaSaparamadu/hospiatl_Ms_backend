const User = require('../../models/user');
const bcrypt = require("bcrypt");


// Controller function for user registration
exports.registerUser = async (req, res) => {
  try {
    const {name, age, gender, address, userRole, email, password } = req.body;

    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json("Email already exists");
    }

    // Determine the prefix based on the user role
    let prefix;
    if (userRole === 'patient') {
      prefix = 'PT';
    } else if (userRole === 'doctor') {
      prefix = 'DC';
    } else {
      // Handle invalid user roles
      return res.status(400).json("Invalid user role");
    }

    // Generate a new custom user ID based on user role
    const lastUser = await User.findOne({ userRole }, {}, { sort: { 'createdAt' : -1 } }); // Find the last created user with the same role
    const lastUserId = lastUser ? lastUser.customId : `${prefix}0000`; // Default to PT/DC0000 if no user found
    const numericPart = parseInt(lastUserId.replace(`${prefix}`, ""), 10);
    const newNumericPart = numericPart + 1;
    const newUserId = `${prefix}${newNumericPart.toString().padStart(4, "0")}`;

    // Bcrypt the user password
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    // Create a new user instance and save it to the database
    const newUser = new User({
      customId: newUserId,
      name,
      age,
      gender,
      address,
      userRole,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Registration success
    return res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
