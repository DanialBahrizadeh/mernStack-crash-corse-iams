const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");
const {
  findByIdAndUpdate,
  findOneAndUpdate,
} = require("../models/workoutModel");
module.exports = {
  // get all the workouts
  getWorkout: async (req, res) => {
    try {
      const allWorkouts = await Workout.find().sort({ createdAt: -1 });
      res.status(200).json(allWorkouts);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // get one workout
  getOneWorkOut: async (req, res) => {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      try {
        const target = await Workout.findById(id);

        if (!target) {
          res.status(404).json({ error: "no such workout exsist" });
        }

        res.status(200).json(target);
      } catch (err) {
        res.status(404).json({ error: err.message });
      }
    } else {
      res.status(404).json({ error: "not valid id" });
    }
  },

  //Post workout
  postWorkOut: async (req, res) => {
    const { title, load, reps } = req.body;
    let emptyFields = [];

    if (!title) {
      emptyFields.push("title");
    }

    if (!load) {
      emptyFields.push("load");
    }

    if (!reps) {
      emptyFields.push("reps");
    }

    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: "Please fill in all the fields", emptyFields });
    }

    try {
      const workout = await Workout.create({ title, load, reps });
      res.status(201).json(workout);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  //update workout
  patchWorkOut: async (req, res) => {
    const { id } = req.params;
    const update = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "not valid id" });
    }

    try {
      const target = await Workout.findByIdAndUpdate(id, update);

      if (!target) {
        return res.status(404).json({ error: "no such workout exsist" });
      }

      res.status(201).json(target);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  //delete workout
  deleteWorkOut: async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "not valid id" });
    }

    try {
      const target = await Workout.findByIdAndDelete(id);
      if (!target) {
        return res.status(404).json({ error: "no such workout exsist" });
      }
      res.status(200).json(target);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
