const { AuthenticationError } = require("apollo-server-express");
const { User, Workout } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },

    workouts: async () => {
      const workoutData = await Workout.find();

      return workoutData;
    },
    workoutsByArea: async (parent, { area }, context) => {
      const workoutData = await Workout.find({ area: area });

      return workoutData;
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("workouts");

        return userData;
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addWorkout: async (parent, args, context) => {
      if (context.user) {
        const workoutData = await Workout.create({ ...args });

        return workoutData;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addFavorite: async (parent, { workoutId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { workouts: workoutId } },
          { new: true }
        )
          .select("-__v -password")
          .populate("workouts");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeFavorite: async (parent, { workoutId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { workouts: workoutId } },
          { new: true }
        )
          .select("-__v -password")
          .populate("workouts");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
