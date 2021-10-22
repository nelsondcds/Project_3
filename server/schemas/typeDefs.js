const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type workout {
    reps: Int
    weight: Int
    time: String
    description: String
  }

  type User {
    _id: ID
    username: String
    password: String
    email: String
  }


type Query {
  Workout: workout
  User: User
}

type Mutation {
  login(email: String!, password: String!): User
  addUser(username: String!, email: String!, password: String!): User
}


`;



module.exports = typeDefs;
