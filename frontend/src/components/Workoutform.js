import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
export default function WorkoutForm() {
  const { dispatch } = useWorkoutsContext();
  const [formData, setFormData] = useState({
    title: "",
    load: 0,
    reps: 0,
  });

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  function handleChange({ target }) {
    const { name, value } = target;
    setFormData((preFormData) => ({
      ...preFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setFormData({
        title: "",
        load: 0,
        reps: 0,
      });
      setError(null);
      setEmptyFields([]);
      console.log("new work out added", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="title"
        onChange={handleChange}
        value={formData.title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label htmlFor="load">Load (in kg):</label>
      <input
        type="number"
        id="load"
        name="load"
        placeholder="load"
        onChange={handleChange}
        value={formData.load}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <label htmlFor="reps">Reps:</label>
      <input
        type="number"
        id="reps"
        name="reps"
        placeholder="reps"
        onChange={handleChange}
        value={formData.reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
