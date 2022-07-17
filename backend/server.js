require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const workoutRouter = require("./routes/workouts");

app.use(express.json());

app.use(({ path, method, ...req }, res, next) => {
  console.log({ path, method });
  next();
});

// routs
app.get("/", (req, res) => {
  res.send("test");
});

app.use("/api/workouts", workoutRouter);

// connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server is listing to the port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
