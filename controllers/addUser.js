const admin = require("../configs/firebaseAdmin");
const { errorResponse, missingKeys } = require("../helpers/basicFunctions");
const { STATUS } = require("../helpers/constants");
const User = require("../models/userData");

const createUserProfile = async (req, res, next) => {
    console.log("createUserProfile");
    res.controller = "createUserProfile";

    try {
        // ! remove the below line
        if (!req.user) 
            return errorResponse(STATUS.BAD_REQUEST, "Missing user data - bypassed authentication ?", next);
        if (req?.user?.profileComplete) 
            return errorResponse(STATUS.ACCEPTED, "Profile already complete", next);

        const requiredKeys = missingKeys(req.body, ["displayName", "phoneNumber"]);
        if (requiredKeys.length > 0) 
            return errorResponse(STATUS.BAD_REQUEST, `Missing keys: ${requiredKeys}`, next);
        const { displayName, photoURL, phoneNumber } = req.body;
        const profileData = {
            phoneNumber: phoneNumber,
            displayName: displayName,
            photoURL: photoURL,
            // ! need to check this condition later
            // ? might have resolved this issue
            emailVerified: true,
            profileComplete: true,
        };
        Object.assign(req.user, profileData);
        console.log(req.user);
        const savedData = await req.user.save();
        // const savedData = await user.save();
        res.statusCode = 200;
        res.message = "Profile Updated";
        res.data = savedData;
        return next();
    } catch (error) {
        if (error.status) return next(error);
        return next(error);
    }
};

// while signing up for the first time
const addUser = async (req, res, next) => {
    console.log("addUser");
    res.controller = "addUser";
    try {
        if (!req.query.access_token) return errorResponse(STATUS.BAD_REQUEST, "Missing access token", next)
        const { access_token } = req.query;
        const decodedToken = await admin.auth().verifyIdToken(access_token);
        const { uid, email, email_verified } = decodedToken;
        const user = new User({
            userId: uid,
            email: email,
            emailVerified: email_verified,
        });
        const savedData = await user.save();
        res.statusCode = 200;
        res.message = "User Added";
        res.data = savedData;
        return next();
    } catch (error) {
        if (error.status) return next(error);
        return next(error);
    }
};

//addUser and updateUser
// addUser : adding user when they login via email - they are just added
// updateUser : when they complete theier profile - they are updated
// if profileComplete is true then they are updated otherwise they are redirected to the profile page

module.exports = {
    addUser,
    createUserProfile,
}
