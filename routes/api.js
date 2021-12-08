const {Workout} = require("../models");
const router = require("express").Router();

//get workouts
router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
        $addFields: {
            totalDuration: {
                $sum: '$exercise.duration'
            },
        },
    },
])
    .then((workout) => {
       
        res.json(workout)
    })
    .catch((e) => {
        res.json(e)
    })
});

router.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    { _id: params.id },
    { $push: { exercises: body } },
    { new: true }
  )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).res.json(err);
    });
});

//create workout
router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
  .then(workoutData => {
    res.json(workoutData);
  })
  .catch(err => {
    res.status(400).json(err);
  });

});

// get workouts in range
router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
        $addFields: {
            totalDuration:
                { $sum: '$exercise.duration' },
            totalWeight:
                { $sum: '$exercises.weight' }
        }
    }
])
    .limit(7)
    .then((workout) => {
      
        res.json(workout)
    })
    .catch((e) => {
        res.json(e)
    })
});


module.exports = router;
