// get vendors in given radius
// get the longitude and latitude of the user and search vendors witihin the radius of the 5km
const SubscriptionPlan = require("../models/subscriptionPlan");
const Vendor = require("../models/vendorData");
const { STATUS } = require("../helpers/constants");
const { missingKeys } = require("../helpers/basicFunctions");

const getVendors = async (req, res, next) => {
    console.log("listVendors");
    try {
        res.controller = "listVendors";
        // search vendors query
        // first list by radius and then apply filters if any are applied
        // filters : rating, veg, non-veg, vegan, gluten-free, dairy-free, nut-free, etc.
        missingKeys(req?.body, ["longitude", "latitude"], next);
        const { radius = 5, avgRating = 0, isVeg } = req?.body;
        // make geospacial query with the radius and the longitude and latitude of the user
        const getVendorsQuery = {
            address: {
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [
                                req.body.longitude,
                                req.body.latitude,
                            ],
                        },
                        $maxDistance: radius * 1000,
                    },
                },
            },
        };
        if (avgRating)
            getVendorsQuery.avgRating = {
                $gte: avgRating,
            };
        if (isVeg) getVendorsQuery.isVeg = isVeg;
        const vendors = await Vendor.find(getVendorsQuery);
        res.status = STATUS.OK;
        res.message = "Vendors fetched successfully";
        res.data = vendors;
        return next();
    } catch (error) {
        if (error.status) return next(error);
        throw error;
    }
};

const filterPlansQuery = (filter) => {
    let planQuery = {
        menuType : {}
    };
    const { isVeg, isJain, isGlutenFree, isLactoseFree, isKeto, isLowCalorie, canPause, hasTrial, session, planType } = filter;
    if (avgRating) planQuery.avgRating = { $gte: avgRating };
    if (isVeg != undefined) planQuery.menuType.isVeg = isVeg;
    if (isJain != undefined) planQuery.menuType.isJain = isJain;
    if (isGlutenFree != undefined) planQuery.menuType.isGlutenFree = isGlutenFree;
    if (isLactoseFree != undefined) planQuery.menuType.isLactoseFree = isLactoseFree;
    if (isKeto != undefined) planQuery.menuType.isKeto = isKeto;
    if (isLowCalorie != undefined) planQuery.menuType.isLowCalorie = isLowCalorie;
    if (canPause != undefined) planQuery.canPause = canPause;
    if (hasTrial != undefined) planQuery.hasTrial = hasTrial;
    if (session != undefined) planQuery.session = session;
    if (planType != undefined) planQuery.planType = planType;
    return planQuery;
}

const plans = async (req, res, next) => {
    console.log("plans");
    try {
        res.controller = "plans";
        // filters : rating, veg, non-veg, vegan, gluten-free, dairy-free, nut-free, etc.
        const { filter = {} } = req?.body;
        let filterQuery = filterPlansQuery(filter);
        const plans = await SubscriptionPlan.find(filterQuery);

        res.message = "Plans fetched successfully";
        res.data = plans;
        res.statusCode = STATUS.OK;
        return next(res);
    } catch (error) {
        if (error.status) return next(error);
        throw error;
    }
};

module.exports = {getVendors, plans};
