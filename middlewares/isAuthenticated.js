const admin = require("../configs/firebaseAdmin");
const { errorResponse } = require("../helpers/basicFunctions");
const { STATUS } = require("../helpers/constants");
const User = require("../models/userData");

// authenticate user based on firebase token
// attached with each request
const isAuthenticated = async (req, res, next) => {
    res.controller = "isAuthenticated";
    const authToken = req.headers.authorization.split(" ")[1];

    try{
        const decodedToken = await admin.auth().verifyIdToken(authToken);
        if (!decodedToken.email_verified) 
            return errorResponse(STATUS.UNAUTHORIZED, "Email not verified", next);
        let user = (await User.find({userId : decodedToken.uid}))[0];
        // user = user[0];
        if (!user) 
            return errorResponse(STATUS.NO_CONTENT, "User not found", next)
        // ! may think about removing the req.body.profile check and add another check
        if (!req?.body?.profile && !user.profileComplete) 
            return errorResponse(STATUS.UNAUTHORIZED, "Profile not complete", next);
        if (user.disabled) 
            return errorResponse(STATUS.FORBIDDEN, "User disabled", next);
        req.user = user;
        return next();
    }
    catch(error){
        console.log(error.message);
        return errorResponse(STATUS.UNAUTHORIZED, error.message, next);
    }
}

module.exports = isAuthenticated;