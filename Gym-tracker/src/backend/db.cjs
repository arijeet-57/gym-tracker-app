const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/gym-app");

//route for user database and their data
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const workoutSchema = new mongoose.Schema({
    username: {type: String, ref: "User"}, //this links the workouts to the userschema so that each workout is linked to a user
    exercise:  String,
    sets: Number,
    weight: Number,
    reps: Number,
    date: {type: Date, default: Date.now}
});


const User = mongoose.model("User", userSchema);
const Workout =  mongoose.model("Workout", workoutSchema);

module.exports  = {User, Workout};