const express = require('express');
const router = express.Router();
const Project = require('../models/Project.js');
const Candidate = require('../models/Candidate'); // Adjust path as needed
const mongoose = require('mongoose')

// Get all projects
router.get('/', async (req, res) => {
    const projects = await Project.find().populate('assignedTo');
    res.json(projects);
});

// Assign a new project
router.post('/assign', async (req, res) => {
    try{
        const { name, description, assignedTo } = req.body;
        const newProject = new Project({ name, description, assignedTo });
        await newProject.save();
        res.json({ message: 'Project Assigned Successfully' });
    }catch(err){
        res.json({
            message: "Candidate not found",
            err: err.message,
            
        })
    }
});


router.get('/candidate/:candidateId', async (req, res) => {
    const { candidateId } = req.params;

    try {
        // Convert candidateId to ObjectId if needed
        const objectId = new mongoose.Types.ObjectId(candidateId);

        // Find projects with the given candidateId
        const projects = await Project.find({ candidateId: objectId });
        console.log(projects)
        if (!projects.length) {
            return res.status(404).json({ message: 'No projects found for this candidate' });
        }
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

module.exports = router;
