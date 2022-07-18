import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
export default function Workout({ workout }) {
  const { dispatch } = useWorkoutsContext();
  async function handleClick() {
    try {
      const res = await fetch(`/api/workouts/${workout._id}`, {
        method: "DELETE",
      });
      const json = await res.json();

      if (res.ok) {
        dispatch({ type: "DELETE_WORKOUT", payload: json });
      }
    } catch (error) {
      throw Error(error);
    }
  }
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps (kg): </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined  " onClick={handleClick}>
        delete
      </span>
    </div>
  );
}
