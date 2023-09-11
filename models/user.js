const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  age: Number,
  beltRank: {
    type: String,
    enum: ['White', 'Blue', 'Purple', 'Brown', 'Black'],
    required: false,
  },
  googleId: {
    type: String,
    required: true,
  },
  email: String,
  avatar: String,
  techniques: [{
    type: Schema.Types.ObjectId,
    ref: 'Technique', 
  }],
  trainingSessions: [{
    type: Schema.Types.ObjectId,
    ref: 'TrainingSession', 
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
