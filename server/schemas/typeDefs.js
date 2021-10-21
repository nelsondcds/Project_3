const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type workout {
    _id: ID
    title: String
    author: String
    pages: Int
    description: String
  }

  type Query {
    books: [Book]
  }
`;

module.exports = typeDefs;
