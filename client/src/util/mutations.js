import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email 
        password
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`;

export const ADD_WORKOUT = gql `
  mutation addWorkout($reps: Int!, $weight: Int!, $time: Int!, $description: String! ) {
      addWorkout(reps: $reps, weight: $weight, time: $time, description: $description){
          reps
          weight
          time
          description
      }
  }
`