const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: String,
    description: String,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
    status: { type: String, default: 'Pending' },
    candidateId: {
        type: String, 
    }
});

module.exports = mongoose.model('Project', ProjectSchema);
