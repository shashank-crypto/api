// get vendors in given radius
// get the longitude and latitude of the user and search vendors witihin the radius of the 5km
const subscriptionPlan = require('../models/subscriptionPlan');
const { STATUS } = require('../helpers/constants');

const listVendors = async (req, res, next) => {
    console.log("listVendors");
    try {
        res.controller = "listVendors";
        // search vendors query
        // first list by radius and then apply filters if any are applied
        // filters : rating, veg, non-veg, vegan, gluten-free, dairy-free, nut-free, etc.
        return next();
    }
    catch (error) {
        if (error.status) return next(error);
        throw error;
    }
}

const plans = async (req, res, next) => {
    console.log("plans");
    try {
        res.controller = "plans";
        const plans = await subscriptionPlan.find().populate('vendorId');
        res.message = "Plans fetched successfully";
        res.data = plans;
        res.statusCode = STATUS.OK;
        return next(res);
    }
    catch (error) {
        if (error.status) return next(error);
        throw error;
    }
}

module.exports = plans