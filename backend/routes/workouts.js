const { Router } = require("express");
const router = new Router();

const {
  getWorkout,
  getOneWorkOut,
  postWorkOut,
  patchWorkOut,
  deleteWorkOut,
} = require("../controllers/workoutController");

router.get("/", getWorkout);
router.get("/:id", getOneWorkOut);
router.post("/", postWorkOut);
router.patch("/:id", patchWorkOut);
router.delete("/:id", deleteWorkOut);
module.exports = router;
