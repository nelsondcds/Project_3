const { Schema, model } = require('mongoose');

const workoutSchema = new Schema({
  reps: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const workout = model('workout', workoutSchema);

module.exports = workout;
