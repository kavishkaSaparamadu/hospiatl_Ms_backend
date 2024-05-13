const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/user/registration'); // Adjusted path to the controllers folder

router.post('/user/register', registrationController.registerUser);

module.exports = router;
