// models/trainingSession.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainingSessionSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  techniquesUsed: [{
    type: Schema.Types.ObjectId,
    ref: 'Technique', 
  }],
  journal: {
    type: String, 
  },
});

module.exports = mongoose.model('TrainingSession', trainingSessionSchema);
