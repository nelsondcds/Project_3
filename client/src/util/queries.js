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
    reps
    weight
    time 
    description

  }

`
