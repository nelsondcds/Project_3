import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_FAVORITE, REMOVE_FAVORITE } from "../../util/mutations";

const WorkoutList = ({
  workouts,
  dataState,
  favWorkouts,
  setDataState,
  location,
}) => {
  const shuffleWorkouts = workouts.sort(() => 0.5 - Math.random());
  const randomWorkouts = [];

  const [favState, setFavState] = useState({});
  const [checkFavsState, setCheckFavsState] = useState(false);

  const [addFavorite, { error: addFavoriteError }] = useMutation(ADD_FAVORITE);

  const [removeFavorite, { error: removeFavoriteError }] =
    useMutation(REMOVE_FAVORITE);

  const handleAdd = async (id) => {
    try {
      const { data: addedData } = await addFavorite({
        variables: { workoutId: id },
      });
      setFavState({...favState, [id]: true});console.log(favState)
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemove = async (id) => {
    try {
      const { data: removedData } = await removeFavorite({
        variables: { workoutId: id },
      });
      setDataState([]);
    } catch (e) {
      console.error(e);
    }
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

  if (favWorkouts.length && dataState.length && checkFavsState != true) {
    let favorites = {};
    favWorkouts.forEach((favWorkout) => {
      favorites = {...favorites, [favWorkout._id]: true };
    })
    setFavState(favorites);
    setCheckFavsState(true);
  }

  if (!workouts.length) {
    return <h3>No Workouts Yet!</h3>;
  }

  return (
    <div>
      {randomWorkouts &&
        dataState.map((workout, index) => (
          <div className="workout" key={workout._id}>
            <label>Area of focus:</label>
            <p>{workout.area}</p>
            <label>Workout description:</label>
            <p>{workout.description}</p>
            <label>Number of reps:</label>
            <p>{workout.reps}</p>
            <label>Weight in lbs:</label>
            <p>{workout.weight}</p>
            <label>Expected time for workout in minutes:</label>
            <p>{workout.time}</p>
            {location.pathname !== "/favorites" ? (
              favState[workout._id] ? (
                <button
                  onClick={() => console.log("Why are you clicking this?")}
                >
                  Favorited
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
