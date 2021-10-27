import { useQuery } from '@apollo/client';
import { GET_FAVORITES } from '../util/queries';
import React, { useState } from "react";
import WorkoutList from '../components/WorkoutList';

function Favorites({ location }) {
    const { loading, data } = useQuery(GET_FAVORITES);
    const favWorkouts = data?.user.workouts || []; console.log(favWorkouts)

    const [dataState, setDataState] = useState([]);

    return (
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
    );
}

export default Favorites;
