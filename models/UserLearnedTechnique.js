const mongoose = require('mongoose');

const userTechniqueSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    technique: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Technique', // Reference to the Technique model
    },
});

module.exports = mongoose.model('UserTechnique', userTechniqueSchema);


