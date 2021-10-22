const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type workout {
    reps: Int
    weight: Int
    time: String
    description: String
  }


type Query {
  Workout: workout
}

`;



module.exports = typeDefs;
