const db = require("../models");
const router = require("express").Router();

//get workouts
router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      dbWorkout.forEach((workout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
});

// add exercise
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findOneAndUpdate(
    params.id, { $push: { exercises: body } }, { new: true }
    )
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//create workout
router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
    .catch((err) => {
      res.json(err);
    });
});

// get workouts in range
router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}).limit(5)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
