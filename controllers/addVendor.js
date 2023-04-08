// ceate vendor accounts
// register as vendor
const vendor = require('../models/vendorData');
const user = require('../models/userData');
const { missingKeys, errorResponse } = require('../helpers/basicFunctions');
const { addAddress } = require('../services/address');
const { STATUS } = require('../helpers/constants');
const { MongooseError } = require('mongoose')

// ! add option for business email, business phone number
// ! make emailVerified and phoneVerified to be mandatory to register as vendor > or add it later to activate the account
const registerAsVendor = async (req, res, next) => {
    console.log("registerAsVendor");
    // // ! remove this check
    const { userId, email, emailVerified, phoneNumber, phoneVerified } = req.user;
    // get user with uid and get the phone Number
    const requiredKeys = missingKeys(req?.body, ['displayName', 'photoURL']);
    if (requiredKeys > 0)
        return errorResponse(STATUS.BAD_REQUEST, `Missing keys: ${requiredKeys.join(', ')}`, next);
    const { displayName, photoURL, address, businessPhoneNumber } = req.body;
    // ! check if the user is already a vendor
    if (!phoneNumber && !businessPhoneNumber) 
        return errorResponse(STATUS.BAD_REQUEST, "Missing phone number", next);
    try {
        res.controller = "registerAsVendor";
        const vendorInfo = new vendor({
            userId : userId,
            email : email,
            emailVerified : emailVerified,
            phoneNumber : businessPhoneNumber || phoneNumber,
            phoneNumberVerified : businessPhoneNumber ? false : phoneVerified,
            displayName : displayName,
            photoURL : photoURL,
        });
        // ! change this to see if no address is provided then take the address from the user
        if (address) addAddress(address, vendorInfo, userData.phoneNumber);
        const savedVendor = await vendorData.save();
        res.statusCode = STATUS.CREATED;
        res.message = "Vendor registered successfully";
        res.data = savedVendor;
        return next();
    }
    catch (error) {
        // to handle duplicate key error
        if (error instanceof MongooseError && error.code === 11000) {
            const duplicateKey = Object.keys(error.keyPattern)[0];
            return errorResponse(STATUS.CONFLICT, `${duplicateKey} already registered`, next);
        }
        if (error.status) return next(error);
        errorResponse(STATUS.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = registerAsVendor;