const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const registrationController = require('../controllers/user/registration'); // Adjusted path to the controllers folder

router.post('/user/register', registrationController.registerUser);


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ message: 'User is not registered' });
      }
  
      // Compare password
      if (!(await bcrypt.compare(req.body.password,user.password))) {
        return res.status(400).json({ message: 'Invalid password' });
      }
  
      // Return success message
      return res.json({ status: true, message: "Login successfully" });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  module.exports = router;
