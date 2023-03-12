const mongoose = require("mongoose");
const { STATUS } = require("../helpers/constants");
const { errorHandler } = require("../middlewares/responseHandler");
const User = require("../models/userData");

const createUserProfile = async (req, res, next) => {
    console.log("createUserProfile");
    res.controller = "createUserProfile";

    const { userId, email, profileComplete } = req.user;
    const filter = { userId: userId, email: email };
    try {
        if (profileComplete) return errorHandler(STATUS.ACCEPTED, "Profile already complete", next);
        const { displayName, photoURL, phoneNumber } = req.body;
        const profileData = {
            phoneNumber: phoneNumber,
            displayName: displayName,
            photoURL: photoURL,
            emailVerified: true,
            profileComplete: true,
        };
        const savedData = await User.findOneAndUpdate(filter, profileData, {
            new: true,
        });
        res.statusCode = 200;
        res.message = "Profile Updated";
        res.data = savedData;
        return next();
    } catch (error) {
        return next(error);
    }
};

// while signing up for the first time
const addUser = async (req, res, next) => {
    console.log("addUser");
    res.controller = "addUser";
    try {
        const { uid, email } = req.user;
        const user = new User({
            userId: uid,
            email: email,
        });
        res.statusCode = 200;
        res.message = "User Added";
        res.data = savedData;
        const error = new Error("User Already Exists");
        error.status = 400;
        return next(error);
    } catch (error) {
        throw error;
    }
};

//addUser and updateUser
// addUser : adding user when they login via email - they are just added
// updateUser : when they complete theier profile - they are updated
// if profileComplete is true then they are updated otherwise they are redirected to the profile page

module.exports = addUser;
