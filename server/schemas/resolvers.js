
const { User, Workout } = require('../models');

const resolvers = {
  Query: {
    Workout: async () => {
      return Workout.find();
    },
  },
};

module.exports = resolvers;
