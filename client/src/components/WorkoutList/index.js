import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_FAVORITE, REMOVE_FAVORITE } from "../../util/mutations";

const WorkoutList = ({
  workouts,
  favWorkouts,
  dataState,
  setDataState,
  location,
  title,
}) => {
  const shuffleWorkouts = workouts.sort(() => 0.5 - Math.random());
  const randomWorkouts = [];

  const [addFavorite, { error: addFavoriteError }] = useMutation(ADD_FAVORITE);

  const [removeFavorite, { error: removeFavoriteError }] =
    useMutation(REMOVE_FAVORITE);

  const handleAdd = async (id) => {
    try {
      const { data: addedData } = await addFavorite({
        variables: { workoutId: id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemove = async (id) => {
    setDataState([]);
    try {
      const { data: removedData } = await removeFavorite({
        variables: { workoutId: id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const isEqual = (first, second) => {
    return JSON.stringify(first) === JSON.stringify(second);
  };

  useEffect(() => {
    if (randomWorkouts && !dataState.length) {
      setDataState(randomWorkouts);
    }
  });

  if (location.pathname === "/favorites") {
    randomWorkouts.push.apply(randomWorkouts, workouts);
  } else {
    randomWorkouts.push.apply(randomWorkouts, shuffleWorkouts.slice(0, 10));
  }

  if (!workouts.length) {
    return <h3>No Workouts Yet!</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {randomWorkouts &&
        dataState.map((workout, index) => (
          <div key={workout._id}>
            <p>{workout.area}</p>
            <p>{workout.description}</p>
            <p>{workout.reps}</p>
            <p>{workout.weight}</p>
            <p>{workout.time}</p>
            {location.pathname !== "/favorites" ? (
              favWorkouts.some((e) =>
                isEqual(e, {
                  _id: workout._id,
                  reps: workout.reps,
                  weight: workout.weight,
                  time: workout.time,
                  description: workout.description,
                  area: workout.area,
                  __typename: "Workout",
                })
              ) ? (
                <button
                  onClick={() => console.log("Why are you clicking this?")}
                >
                  Already Favorited
                </button>
              ) : (
                <button onClick={() => handleAdd(workout._id)}>
                  Add to Favorites
                </button>
              )
            ) : (
              <button onClick={() => handleRemove(workout._id)}>
                Remove from Favorites
              </button>
            )}
          </div>
        ))}
    </div>
  );
};

export default WorkoutList;
