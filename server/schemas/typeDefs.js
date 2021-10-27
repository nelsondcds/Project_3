const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Workout {
    _id: ID
    reps: Int
    weight: Int
    time: Int
    description: String
    area: String
  }

  type User {
    _id: ID
    username: String
    password: String
    email: String
    workouts: [Workout]
  }

  type Query {
    workouts: [Workout]
    workoutsByArea(area: String!): [Workout]
    user: User
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addWorkout(
      reps: Int!
      weight: Int!
      time: Int!
      description: String!
      area: String!
    ): Workout
    addFavorite(workoutId: ID!): User
    removeFavorite(workoutId: ID!): User
  }
`;

module.exports = typeDefs;
