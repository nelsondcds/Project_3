import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      username
      email
    }
  }
`;

export const WORKOUTS = gql`
  query workouts {
    workouts {
      _id
      reps
      weight
      time
      description
      area
    }
  }
`;

export const WORKOUTS_BY_AREA = gql`
  query workoutsByArea($area: String!) {
    workoutsByArea(area: $area) {
      _id
      reps
      weight
      time
      description
      area
    }
  }
`;

export const GET_FAVORITES = gql`
  query user {
    user {
      workouts {
        _id
        reps
        weight
        time
        description
        area
      }
    }
  }
`;
