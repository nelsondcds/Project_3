const { Schema, model } = require("mongoose");

const workoutSchema = new Schema(
  {
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
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// const Workout = model("workout", workoutSchema);

module.exports = Workout;

// const WorkoutSchema = new Schema({
//   sets: {
//     type: Number,
//     required: true,
//   },
//   weight: {
//     type: Number,
//     required: true,
//   },
//   reps: {
//     type: Number,
//     required: true,
//   },
//  time: {
//      type: String,
//      required: false,
//  },
//   description: {
//     type: String,
//     required: true,
//   }
// });

// const Workout = model('Workout', WorkoutSchema);

// module.exports = Workout;
