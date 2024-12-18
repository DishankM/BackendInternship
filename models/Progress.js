const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    candidateId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Candidate', 
        required: true 
    }, // Reference to Candidate model
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project', 
        required: true 
    }, // Reference to Project model
    tasksCompleted: { type: Number, default: 0 }, // Number of tasks completed
    totalTasks: { type: Number, required: true }, // Total number of tasks for the project
    score: { type: Number, default: 0 }, // Score as a percentage
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Middleware to calculate score before saving
ProgressSchema.pre('save', function (next) {
    if (this.totalTasks > 0) {
        this.score = (this.tasksCompleted / this.totalTasks) * 100;
    }
    next();
});

module.exports = mongoose.model('Progress', ProgressSchema);
