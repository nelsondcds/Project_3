import React, { useEffect, useState } from "react";
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

  const [favState, setFavState] = useState({});

  const [addFavorite, { error: addFavoriteError }] = useMutation(ADD_FAVORITE);

  const [removeFavorite, { error: removeFavoriteError }] =
    useMutation(REMOVE_FAVORITE);

  const handleAdd = async (id) => {
    try {
      const { data: addedData } = await addFavorite({
        variables: { workoutId: id },
      });
      setFavState({...favState, [id]: true});
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

  if (!workouts.length) {
    return <h3>No Workouts Yet!</h3>;
  }

  return (
    <div>
      {location.pathname !== "/favorites" &&
        <h3>{title}</h3>
      }
      {randomWorkouts &&
        dataState.map((workout, index) => (
          <div className="workout" key={workout._id}>
            <p>{workout.area}</p>
            <p>{workout.description}</p>
            <p>{workout.reps}</p>
            <p>{workout.weight}</p>
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
