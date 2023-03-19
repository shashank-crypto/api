// ceate vendor accounts
// register as vendor
const vendor = require('../models/vendorData');
const user = require('../models/userData');
const { missingKeys, errorResponse } = require('../helpers/basicFunctions');
const { addAddress } = require('../services/address');

// ! add option for business email, business phone number
// ! make emailVerified and phoneVerified to be mandatory to register as vendor
const registerAsVendor = async (req, res, next) => {
    console.log("registerAsVendor");
    // const { userId, email, phoneNumber } = req.body;
    if (missingKeys(req.user, ['uid', 'email', 'emailVerified']) > 0) 
        return errorResponse(STATUS.UNAUTHORIZED, "Unauthorized access", next);
    const { uid, email, emailVerified } = req.user;
    // get user with uid and get the phone Number
    const requiredKeys = ['displayName'];
    if (requiredKeys > 0)
        return errorResponse(STATUS.BAD_REQUEST, `Missing keys: ${requiredKeys.join(', ')}`, next);
    const { displayName, photoURL, address } = req.body;

    
    const userData = await user.findById({userId : uid});
    try {
        res.controller = "registerAsVendor";
        const vendorInfo = new vendor({
            userId : uid,
            email : email,
            emailVerified : emailVerified,
            phoneNumber : userData.phoneNumber,
            phoneNumberVerified : userData.phoneNumberVerified,
            displayName : displayName,
            photoURL : photoURL,
        });
        if (address) addAddress(address, vendorInfo, userData.phoneNumber);
        const savedVendor = await vendorData.save();
        res.statusCode = STATUS.CREATED;
        res.message = "Vendor registered successfully";
        res.data = savedVendor;
        return next();
    }
    catch (error) {
        if (error.status) return next(error);
        errorResponse(STATUS.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = registerAsVendor;