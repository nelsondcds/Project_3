import gql from 'graphql-tag';

export const GET_ME = gql`
  {
    me {
      username
      email
    }
  }
`;

export const WORKOUT = gql`
  query Workout {
    _id
    reps
    weight
    time 
    description
    area
  }
`;
