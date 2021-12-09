const {Workout} = require("../models/index.js");
const router = require("express").Router();

//get workouts
router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
        {$addFields: {totalDuration: {$sum: '$exercises.duration'}}}
    ])
    .then((workout) => {
       console.log(workout)
        res.json(workout)
    })
    .catch((e) => {
        res.json(e)
    })
});

router.put("/api/workouts/:id", (req, res) => {
  Workout.findOne({ _id: req.params.id})
  .then(workout => {
    workout.exercises.push(req.body)
    workout.save((err) => {
      if (err) {
        res.status(400).json(err);
      }
      res.json(workout);
    })
  })
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
