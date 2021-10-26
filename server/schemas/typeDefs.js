const { gql } = require("apollo-server-express");

const typeDefs = gql`
<<<<<<< HEAD
 type workout {
    _id: ID 
    reps: Int
   weight: Int 
   time: Int
   description: String
 } 
=======
  type workout {
    reps: Int
    weight: Int
    time: Int
    description: String
  }
>>>>>>> 1985e7d7e79d371fe2821006443c156ca006b2f7

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

  type Query {
    Workout: workout
    user: User
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }

<<<<<<< HEAD
type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  addWorkout(reps: Int!, weight: Int!, time: Int!, description: String!): workout
}
=======
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
>>>>>>> 1985e7d7e79d371fe2821006443c156ca006b2f7
`;

module.exports = typeDefs;
