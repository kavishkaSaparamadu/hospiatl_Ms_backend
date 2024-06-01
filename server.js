const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Initialize the app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.json());

// Routes
const usersRoute = require('./route/admin/users');
app.use('/api/user', usersRoute);

const doctorRoutes = require('./controllers/doctor/detailsController');
app.use('/api/doctor', doctorRoutes);

const patientRoutes = require('./controllers/patient/appointmentController');
app.use('/api/patient', patientRoutes);

const patientProfileRoutes = require('./controllers/patient/detailsController');
app.use('/api/patient/profile', patientProfileRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connection successful');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Node server started at ${PORT}`);
});
