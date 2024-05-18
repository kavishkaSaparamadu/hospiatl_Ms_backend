const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/user/registration'); // Adjusted path to the controllers folder
const authController = require('../controllers/user/login');

router.post('/user/register', registrationController.registerUser);

// Login route
router.post('/user/login', authController.login);

// Authentication check route
router.get('/user/authenticate', authController.isAuth);

module.exports = router;
