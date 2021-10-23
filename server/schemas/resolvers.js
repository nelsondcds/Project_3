const { AuthenticationError } = require('apollo-server-express');
const { Workout } = require('../models');
const { User } = require('../models')
const { signToken } = require('../utils/auth');

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
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      return user;
    }
  }
};

module.exports = resolvers;
