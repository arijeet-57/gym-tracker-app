const express = require("express");
const cors = require("cors");
const { userLoginValidation, userRegisterValidation, userValidation } = require("./middleware.cjs");
const { User, Workout } = require("./db.cjs");

const app = express();

app.use(express.json());
app.use(cors());

//user registration route
app.post("/register",userRegisterValidation, function(req,res) {
    res.json({
        msg: "User registered!"
    })
})

//user login route
app.post("/login", userLoginValidation, function(req,res) {
    res.json({
        msg: "User logged in!"
    })
})

app.post("/tracker",userValidation, async function(req,res) {
    const {exercise, sets, reps, weight} = req.body;

    try {
    const workout = new Workout({
        exercise,
        sets,
        reps,
        weight,
        userId: req.userId
    });
    await workout.save();

    res.json({
        msg: "Exercise saved successfully !"
        });
    }catch(err) {
        res.json({
            msg: "Server side error..."
        })
    }
})


app.get("/logs",userValidation, async function(req,res) {

    try {
        const userId = req.userId;

        const workout = await Workout.findOne({userId});

        res.json({
            msg: "User Workouts",
            workout,
        })
    }catch(err){
        res.json({
            msg:"Error...."
        })
    }

})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})