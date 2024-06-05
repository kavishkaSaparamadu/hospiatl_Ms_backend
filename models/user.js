const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["patient", "doctor", "admin", "pharmacist"], // Fixed typo here
    default: "patient",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isPharmacist: { // Fixed naming inconsistency
    type: Boolean,
    default: false,
  },
  seenNotifications: { // Fixed typo here
    type: Array,
    default: [],
  },
  unseenNotifications: { // Fixed typo here
    type: Array,
    default: [],
  }
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
