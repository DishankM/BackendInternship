const express = require('express');
const Progress = require('../models/Progress');
const Candidate = require('../models/Candidate');
const Project = require('../models/Project');

const router = express.Router();


//  @route POST /api/progress/create
// @desc Create progress for a candidate and project

router.post('/create', async (req, res) => {
    const { candidateId, projectId, totalTasks } = req.body;

    // Validation
    if (!candidateId || !projectId || !totalTasks) {
        return res.status(400).json({ error: 'All fields are required: candidateId, projectId, totalTasks' });
    }

    // if (!mongoose.Types.ObjectId.isValid(candidateId) || !mongoose.Types.ObjectId.isValid(projectId)) {
    //     return res.status(400).json({ error: 'Invalid Candidate ID or Project ID' });
    // }

    try {
        // Check if Candidate and Project exist
        const candidate = await Candidate.findById(candidateId);
        const project = await Project.findById(projectId);

        if (!candidate || !project) {
            return res.status(404).json({ error: 'Candidate or Project not found' });
        }

        // Check if progress already exists for this candidate and project
        const existingProgress = await Progress.findOne({ candidateId, projectId });
        if (existingProgress) {
            return res.status(400).json({ error: 'Progress already exists for this candidate and project' });
        }

        // Create Progress
        const progress = new Progress({ candidateId, projectId, totalTasks });
        await progress.save();

        res.status(201).json({ message: 'Progress created successfully', progress });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
});


/**
 * @route GET /api/progress/:candidateId
 * @desc Get progress for a specific candidate
 */
router.get('/:candidateId', async (req, res) => {
    const { candidateId } = req.params;

    try {
        // Find all progress records for the candidate
        const progress = await Progress.find({ candidateId }).populate('projectId', 'name description');

        if (!progress || progress.length === 0) {
            return res.status(404).json({ error: 'No progress found for this candidate' });
        }

        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
});

/**
 * @route POST /api/progress/update
 * @desc Update progress for a candidate's project
 */
router.post('/update', async (req, res) => {
    const { candidateId, projectId, tasksCompleted } = req.body;

    if (!candidateId || !projectId || tasksCompleted == null) {
        return res.status(400).json({ error: 'All fields are required: candidateId, projectId, tasksCompleted' });
    }

    try {
        // Find progress record
        const progress = await Progress.findOne({ candidateId, projectId });
        if (!progress) {
            return res.status(404).json({ error: 'Progress record not found' });
        }

        // Update tasks completed and recalculate score
        progress.tasksCompleted = tasksCompleted;
        await progress.save();

        res.status(200).json({ message: 'Progress updated successfully', progress });
    } catch (error) {
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
});

module.exports = router;
