import { useQuery } from "@apollo/client";
import { WORKOUT } from "../utils/queries";
import React from "react";
import WorkoutList from "../components/WorkoutList";

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(WORKOUT);
  const workouts = data?.workouts || [];
  console.log(workouts);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <WorkoutList
              workouts={workouts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};
