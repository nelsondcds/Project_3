import { useQuery, useLazyQuery } from "@apollo/client";
import { WORKOUTS, WORKOUTS_BY_AREA, GET_FAVORITES } from "../util/queries";
import React, { useState } from "react";
import WorkoutList from "../components/WorkoutList";
import "./assets/Dashboard.css";

const Dashboard = ({ location }) => {
  const { loading, data } = useQuery(WORKOUTS);
  const allWorkouts = data?.workouts || [];

  const { data: favData } = useQuery(GET_FAVORITES);
  const favWorkouts = favData?.user.workouts || [];

  const [selectState, setSelectState] = useState("");
  const [dataState, setDataState] = useState([]);

  const [getNewWorkouts, { data: newData }] = useLazyQuery(WORKOUTS_BY_AREA, {
    onCompleted() {
      setDataState([]);
    },
  });
  const newWorkouts = newData?.workoutsByArea || [];

  function handleChange(e) {
    setSelectState(e.target.value);
  }

  return (
    <main>
      <div className="flex-row justify-space-between dash">
        <h3>Find your new favorite weightlifting workouts!</h3>
        <div className="col-12 mb-3 dash-search">
          <label style={{color: 'white'}}>Select an area of focus:</label>
          <select className="dash-sel"onChange={handleChange}>
            <option value="">Any</option>
            <option value="Chest">Chest</option>
            <option value="Back">Back</option>
            <option value="Arms">Arms</option>
            <option value="Shoulders">Shoulders</option>
            <option value="Legs">Legs</option>
          </select>
          <button
            onClick={() => {
              if (selectState) {
                getNewWorkouts({ variables: { area: selectState } });
              } else {
                setDataState([]);
              }
            }}
          >
            Find some new workouts!
          </button>
        </div>
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : newData?.workoutsByArea && selectState ? (
            <WorkoutList
              workouts={newWorkouts}
              favWorkouts={favWorkouts}
              dataState={dataState}
              setDataState={setDataState}
              location={location}
              key={location.pathname}
              title="Find some new workouts!"
            />
          ) : (
            <WorkoutList
              workouts={allWorkouts}
              favWorkouts={favWorkouts}
              dataState={dataState}
              setDataState={setDataState}
              location={location}
              key={location.pathname}
              title="Find some new workouts!"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
