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

//This middleware is for user login validation
async function userLoginValidation(req, res, next) {
    const {username, password} = req.body;

    try {
    const existingUser = await User.findOne({username, password});
    if(!existingUser) {
        return res.json({
            msg: "User doesn't exist...Use valid credentials"
        })
    }
    next();
}catch(err) {
    res.status(500).json({
        msg: "Error..."
    })
}}



async function userValidation(req, res, next) {
    const {userId}= req.headers;

    try{
        const existingUser = await User.findById(userId);
    if(!existingUser) {
    return res.json({
            msg: "User does not exist !"
        });
    }

    req.userId = existingUser._id; //attached userid for future use
    next();


    }catch(err) {
        res.json({
            msg: "Server Error..."
        })
    }

}

module.exports = {
    userLoginValidation, 
    userRegisterValidation,
    userValidation
};

