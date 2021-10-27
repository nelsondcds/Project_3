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
                    <h3>Your Favorites</h3>
                    <div className="col-12 mb-3">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <WorkoutList
                            workouts={favWorkouts}
                            favWorkouts={favWorkouts}
                            dataState={dataState}
                            setDataState={setDataState}
                            location={location}
                            key={location.pathname}
                            title="Find some new workouts!" />
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Favorites;
