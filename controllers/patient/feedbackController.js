const express = require("express");
const router = express.Router();
const Feedback = require('../../models/feedback');

// Create new feedback
router.post('/feedback', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const feedback = new Feedback({ name, email, message });
        await feedback.save();
        res.status(201).json({ success: true, message: 'Feedback created successfully', feedback });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create feedback', error: error.message });
    }
});

// Get all feedback
router.get('/feedback', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json({ success: true, feedbacks });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch feedback', error: error.message });
    }
});

// Get feedback by ID
router.get('/feedback/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return res.status(404).json({ success: false, message: 'Feedback not found' });
        }
        res.status(200).json({ success: true, feedback });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch feedback', error: error.message });
    }
});

// Update feedback by ID
router.put('/feedback/:id', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const feedback = await Feedback.findByIdAndUpdate(req.params.id, { name, email, message }, { new: true });
        if (!feedback) {
            return res.status(404).json({ success: false, message: 'Feedback not found' });
        }
        res.status(200).json({ success: true, message: 'Feedback updated successfully', feedback });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update feedback', error: error.message });
    }
});

// Delete feedback by ID
router.delete('/feedback/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback) {
            return res.status(404).json({ success: false, message: 'Feedback not found' });
        }
        res.status(200).json({ success: true, message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete feedback', error: error.message });
    }
});

module.exports = router;
