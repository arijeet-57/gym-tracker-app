const express = require("express");
const cors = require("cors");
const { userLoginValidation, userRegisterValidation } = require("./middleware.cjs");
const { User, Workout } = require("./db.cjs");
const { date } = require("zod/v4");

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
app.post("/login", async function(req,res) {
    const {username, password} = req.body;

    try {
    const existingUser = await User.findOne({username, password});
    if(!existingUser) {
        return res.json({
            msg: "User doesn't exist...Use valid credentials"
        })
    }

    res.json({
        msg: "User logged in!",
        username: existingUser.username
    })}catch(err) {
    res.status(500).json({
        msg: "Error..."
    })
}
})

app.post("/tracker", async function(req,res) {
    const {username, exercise, sets, reps, weight} = req.body;

try {
    const existingUser = await User.findOne({username});
    if(!existingUser) {
    return res.json({
            msg: "User does not exist"
        })
    }


    
    const workout = new Workout({
        username,
        exercise,
        sets,
        reps,
        weight,
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


app.get("/logs/:username", async function(req,res) {
    const {username} = req.params;

    
    const existingUser = await User.findOne({username});
    if(!existingUser) {
    return res.json({
            msg: "User does not exist...Can't fetch data!"
        })
    }

    try {
        const workout = await Workout.find({username}).sort({date: -1});

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