const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
            required: true,
        },
        experience: {
            type: String,
            required: true,
        },
        feePerConsultation: {
            type: Number,
            required: true,
        },
        timings: {
            type: Array,
            required: true,
        },
        availableDays: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
