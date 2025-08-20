const express = require("express");
const cors = require("cors");
const { userLoginValidation, userRegisterValidation } = require("./middleware.cjs");

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

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})