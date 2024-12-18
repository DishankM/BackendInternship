const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    //progress: { type: Number, default: 0 }, // Optional field for tracking progress percentage
});

module.exports = mongoose.model('Candidate', CandidateSchema);
