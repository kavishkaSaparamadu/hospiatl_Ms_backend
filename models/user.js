const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  userId:{
    type: String,
    required: true,
    unique: true,
  },
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
    enum: ["patient", "doctor"],
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
  seenNottifications: {
    type:Array,
    default:[]
  },
  unseenNottifications: {
    type:Array,
    default:[]
  }
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
