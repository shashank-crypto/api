// trialPlan or subscriptionPlan
// only vendors can create plans
const { missingKeys, errorResponse } = require("../helpers/basicFunctions");
const { STATUS } = require("../helpers/constants");

const createPlan = (req, res, next) => {
    console.log("createPlan");
    res.controller = "createPlan";

    try {
        if (!req.body.vendor || !req.body.planData)
            return errorResponse(
                STATUS.BAD_REQUEST,
                "Vendor or Plan data not specified",
                next
            );

        const { vendorId, emailVerified, phoneVerified, disabled } =
            req.body.vendor;

        if (!vendorId || !emailVerified || !phoneVerified || disabled)
            return errorResponse(
                STATUS.BAD_REQUEST,
                "Vendor not verified or disabled",
                next
            );

        const {
            subscriptionName,
            session,
            planType,
            pricePerDay,
            pricePerWeek,
            pricePerMonth,
            description,
            canPause,
            isRefundable,
            inactiveDays,
        } = req.body.planData;

        const missedKeys = missingKeys(req.body.planData, [
            "subscriptionName",
            "session",
            "planType",
            "description",
            "canPause",
            "isRefundable",
            "inactiveDays",
        ]);
        if (missedKeys.length > 0)
            return errorResponse(
                STATUS.BAD_REQUEST,
                `Missing keys: ${missedKeys}`,
                next
            );
        if (!(pricePerDay || pricePerWeek || pricePerMonth))
            return errorResponse(
                STATUS.BAD_REQUEST,
                "Price not specified",
                next
            );
        const subscriptionPlan = {
            subscriptionName,
            vendorId,
            session,
            planType,
            description,
            canPause,
            isRefundable,
            inactiveDays,
        };
        if (pricePerDay) subscriptionPlan.pricePerDay = pricePerDay;
        if (pricePerWeek) subscriptionPlan.pricePerWeek = pricePerWeek;
        if (pricePerMonth) subscriptionPlan.pricePerMonth = pricePerMonth;

        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = createPlan;