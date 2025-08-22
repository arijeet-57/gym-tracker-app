const express = require("express");
const cors = require("cors");
const {User, Workout} = require("./db.cjs");

//This middleware is for user registration validation
async function userRegisterValidation(req, res, next) {
    const {username, password} = req.body;

    try {
    const existingUser = await User.findOne({username, password});
    if(existingUser) {
        return res.json({
            msg: "User already exists, try logging in..."
        })
    }

    const newUser = new User({username, password});
    await newUser.save();
    next();
    }catch(err) {
        res.status(500).json({
            msg: "Error..."
        })
    }

}

module.exports = {
    userRegisterValidation
};

