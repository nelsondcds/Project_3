const { gql } = require("apollo-server-express");

const typeDefs = gql`
 type workout {
    _id: ID 
    reps: Int
   weight: Int 
   time: Int
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
  addWorkout(reps: Int!, weight: Int!, time: Int!, description: String!): workout
}
`;

module.exports = typeDefs;
