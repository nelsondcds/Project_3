
const { Workout } = require('../models');
const { User } = require('../models')

const resolvers = {
  Query: {
    Workout: async () => {
      return Workout.find();
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
    
      return user;
    },
    login: async () => {

    }
  }
};

module.exports = resolvers;
