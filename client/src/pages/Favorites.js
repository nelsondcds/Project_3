import { useQuery } from '@apollo/client';
import { GET_FAVORITES } from '../util/queries';
import React, { useState } from "react";
import WorkoutList from '../components/WorkoutList';
import "./assets/Dashboard.css";

function Favorites({ location }) {
    const { loading, data } = useQuery(GET_FAVORITES);
    const favWorkouts = data?.user.workouts || [];

    const [dataState, setDataState] = useState([]);

    return (
        <main>
            <div className="flex-row justify-space-between dash">
                <section>
                    <h1>Your Favorites</h1>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <WorkoutList
                        workouts={favWorkouts}
                        favWorkouts={favWorkouts}
                        dataState={dataState}
                        setDataState={setDataState}
                        location={location}
                        title="Find some new workouts!" />
                    )}
                </section>
            </div>
        </main>
    );
}

export default Favorites;
