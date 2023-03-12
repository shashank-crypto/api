// ceate vendor accounts
// register as vendor
const vendor = require('../models/vendorData');
const user = require('../models/userData');

const registerAsVendor = async (req, res, next) => {
    console.log("registerAsVendor");
    // const { userId, email, phoneNumber } = req.body;
    const { uid, email, emailVerified } = req.user;
    // get user with uid and get the phone Number
    const user = await user.findById({userId : uid});
    try {
        res.controller = "registerAsVendor";
        // search vendors query
        return next();
    }
    catch (error) {
        throw error;
    }
}