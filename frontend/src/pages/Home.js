import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import Workout from "../components/Workout";
import WorkoutForm from "../components/Workoutform";

export default function Home() {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch("/api/workouts/");
        const json = await res.json();
        if (res.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: json });
        }
      } catch (err) {
        throw Error(err);
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  const workoutsElements =
    workouts &&
    workouts.map((workout) => <Workout key={workout._id} workout={workout} />);
  return (
    <div className="home">
      <div className="workouts">{workoutsElements && workoutsElements}</div>
      <WorkoutForm />
    </div>
  );
}
