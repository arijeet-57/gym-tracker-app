const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/gym-app");

//route for user database and their data
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model("User", userSchema);

module.exports  = User;