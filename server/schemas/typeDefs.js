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
}


`;



module.exports = typeDefs;
