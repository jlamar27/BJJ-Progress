const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const techniqueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    isSubmission: {
        type: Boolean,
        required: true,
    },
    description: {
        type: String, 
    },
});

module.exports = mongoose.model('Technique', techniqueSchema)