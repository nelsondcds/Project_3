import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../queries';

function WorkoutList({ setWorkout }) {
    const { data: workoutData } = useQuery(QUERY_CATEGORIES);
    const categories = workoutData?.categories || [];

return (
    <div>
        <h2> Workout of the Day: </h2>
        {categories.map((item) => (
            <button
            key={item._id}
            onClick={() => {
                setWorkout(item._id);
            }}
            >
                {item.name}
            </button>
        ))}
    </div>
);
}

export default WorkoutList;