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
    area: {
      type: String,
      required: true,
      enum: ["Chest", "Back", "Arms", "Shoulders", "Legs"],
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
