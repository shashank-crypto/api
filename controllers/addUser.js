const mongoose = require("mongoose");
const User = require("../models/userData");

const addUser = async (req, res, next) => {
    console.log("addUser");
    
    const userData = {
        userId: "123131",
        email : "abhinav@gmail.com",
        phoneNumber : "1234567890",
        displayName : "Abhinav",
        photoURL : "https://www.google.com"
    }

    try {
        res.controller = "addUser";
        const user = new User(userData);
        const savedData = await user.save();
        res.statusCode = 200;
        res.message = "User Added";
        res.data = savedData;
        return next();
    }
    catch (error) {
        throw error;
    }
}

module.exports = addUser;