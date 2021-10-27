import { useMutation } from "@apollo/client";
import { ADD_WORKOUT } from "../util/mutations";
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const Create = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedState, setSubmittedState] = useState(false);
  const [workoutFormState, setWorkoutFormState] = useState({
    reps: 0,
    weight: 0,
    time: 0,
    description: "",
    area: "",
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [addWorkout, { error }] = useMutation(ADD_WORKOUT);

  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name === "area") {
      if (!value.length) {
        setErrorMessage(`An area of focus is required.`);
      } else {
        setErrorMessage("");
      }
    } else if (name === "reps") {
      if (!value.length || parseInt(value) === 0 || isNaN(parseInt(value))) {
        setErrorMessage(`Number of reps is required.`);
      } else if (parseInt(value) > 30) {
        setErrorMessage(`Number of reps must be a number between 1 and 30.`);
      } else {
        setErrorMessage("");
      }
    } else if (name === "weight") {
      if (!value.length || parseInt(value) === 0 || isNaN(parseInt(value))) {
        setErrorMessage(`Weight in lbs is required.`);
      } else if (parseInt(value) > 1000) {
        setErrorMessage(`Weight in lbs must be a number between 1 and 1000.`);
      } else {
        setErrorMessage("");
      }
    } else if (name === "time") {
      if (!value.length || parseInt(value) === 0 || isNaN(parseInt(value))) {
        setErrorMessage(`Time in minutes is required.`);
      } else if (parseInt(value) > 120) {
        setErrorMessage(`Time in minutes must be a number between 1 and 120.`);
      } else {
        setErrorMessage("");
      }
    } else {
      if (!value.length) {
        setErrorMessage(`A ${name} is required.`);
      } else {
        setErrorMessage("");
      }
    }

    if (!errorMessage) {
      if (isNaN(parseInt(value))) {
        setWorkoutFormState({ ...workoutFormState, [name]: value });
      } else {
        setWorkoutFormState({ ...workoutFormState, [name]: parseInt(value) });
      }
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data: addedWorkout } = await addWorkout({
        variables: {
          ...workoutFormState,
        },
      });
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setWorkoutFormState({
      reps: 0,
      weight: 0,
      time: 0,
      description: "",
      area: "",
    });
    form.reset();
    setSubmittedState(true);
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your submission!
        </Alert>

        <Form.Group className="mb-3">
            <Form.Label column sm="2" style={{color: 'white'}}>Area of focus:</Form.Label>
            <Form.Control size="md"
                name="area"
                type="text"
                as="select"
                // value={workoutFormState.area}
                onChange={handleInputChange}
                required
            >
              <option value="">Please select an area of focus</option>
              <option value="Chest">Chest</option>
              <option value="Back">Back</option>
              <option value="Arms">Arms</option>
              <option value="Shoulders">Shoulders</option>
              <option value="Legs">Legs</option>
            </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label column sm="2" style={{color: 'white'}}>Weight</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please enter a weight in lbs."
            name="weight"
            // value={workoutFormState.weight}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label column sm="2" style={{color: 'white'}}>Reps</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please enter a number of reps."
            name="reps"
            // value={workoutFormState.reps}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label column sm="2" style={{color: 'white'}}>Time</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please enter a time in minutes."
            name="time"
            // value={workoutFormState.time}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label column sm="2" style={{color: 'white'}}>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Please enter a description."
            name="description"
            // value={workoutFormState.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <div className="d-grid mb-2">
          <Button
            disabled={
              !(
                workoutFormState.weight &&
                workoutFormState.area &&
                workoutFormState.description &&
                workoutFormState.time &&
                workoutFormState.reps
              )
            }
            size="lg"
            type="submit"
            variant="success"
          >
            Submit
          </Button>
        </div>
       </Form>
       {submittedState &&
        <p style={{
            color: 'white'
          }}>Workout submitted!</p>
       }
      </>
    );
};

export default Create;
