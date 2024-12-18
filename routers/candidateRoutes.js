const express = require('express');
const Candidate = require('../models/Candidate');

const router = express.Router();

/**
 * @route POST /api/candidates/create
 * @desc Create a new candidate
 */
router.post('/create', async (req, res) => {
    const { name, email } = req.body;

    // Validation
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    try {
        // Check if the candidate already exists
        const existingCandidate = await Candidate.findOne({ email });
        if (existingCandidate) {
            return res.status(400).json({ error: 'Candidate with this email already exists' });
        }

        // Create a new candidate
        const candidate = new Candidate({ name, email });
        await candidate.save();

        res.status(201).json({ message: 'Candidate created successfully', candidate });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

module.exports = router;
