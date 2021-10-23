const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # type WorkoutInput {
  #   id: ID!
  #   body: String!
  #   createdAt: String!
  #   username: String!
  # }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
