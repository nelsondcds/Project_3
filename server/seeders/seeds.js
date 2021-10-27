const faker = require("faker");

const db = require("../config/connection");
const { Workout } = require("../models");

db.once("open", async () => {
  await Workout.deleteMany({});

  const areas = ["Chest", "Back", "Arms", "Shoulders", "Legs"];
  const workoutData = [];

  for (let i = 0; i < 50; i += 1) {
    const reps = faker.datatype.number(29) + 1;
    const weight = faker.datatype.number(499) + 1;
    const time = faker.datatype.number(59) + 1;
    const description = faker.random.words(10);
    const areaNum = faker.datatype.number(4);
    const area = areas[areaNum];

    workoutData.push({ reps, weight, time, description, area });
  }

  try {
    await Workout.collection.insertMany(workoutData);
  } catch (error) {
    throw new Error("failed to seed database");
  }

  console.log("all done!");
  process.exit(0);
});
