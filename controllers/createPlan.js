// trialPlan or subscriptionPlan
// only vendors can create plans
const connectDB = require("../configs/db");
const { missingKeys, errorResponse } = require("../helpers/basicFunctions");
const { STATUS } = require("../helpers/constants");
const subscription = require("../models/subscriptionPlan");

const createPlan = async (req, res, next) => {
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
            hasTrial,
            trialOption,
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

        if (hasTrial && trialOption.minDays) {
            subscriptionPlan.hasTrial = hasTrial;
            subscriptionPlan.trialOption = {
                minDays : trialOption.minDays,
                pricePerDay : trialOption.pricePerDay || pricePerDay || pricePerWeek/7 || pricePerMonth/30
            };
        }

        const newPlan = new subscription(subscriptionPlan);
        const savedPlan = await newPlan.save();

        res.statusCode = STATUS.CREATED;
        res.message = "Plan created successfully"
        res.data = savedPlan;

        return next();
    } catch (error) {
        if (error.status) return next(error);
        return next(error);
    }
};

module.exports = createPlan;