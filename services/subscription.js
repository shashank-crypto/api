// add trial to a subscription plan
// ? should I use fnidByIdAndUpdate? -> to reduce the number of queries

// ! need to change the status of the errorResponse in catch blocks
// ! need to define it more

const { missingKeys } = require("../helpers/basicFunctions");
const subscriptionPlan = require("../models/subscriptionPlan");

const addTrial = async (subscriptionPlan, trialOption, res=null) => {
    if (res) res.controller = "addTrial";
    try {
        if (subscriptionPlan.hasTrial) {
            return errorResponse(STATUS.OK, "Trial plan already exists");
        }
        const { pricePerDay, pricePerWeek, pricePerMonth } = subscriptionPlan;
        subscriptionPlan.hasTrial = true;
        subscriptionPlan.trialOption = {
            minDays : trialOption.minDays,
            pricePerDay : trialOption.pricePerDay || pricePerDay || pricePerWeek/7 || pricePerMonth/30
        };
        const updatedPlan = await subscriptionPlan.save();
        return updatedPlan;
    }
    catch (error) {
        return errorResponse(STATUS.INTERNAL_SERVER_ERROR, error.message);
    }
}

const deleteteSubscriptionPlan = async (subscriptionId, res=null) => {
    if (res) res.controller = "delteteSubscriptionPlan";
    try {
        const updatedPlan = await subscriptionPlan.findByIdAndUpdate(subscriptionId, {disabled : true});
        return updatedPlan;
    }
    catch (error) {
        return errorResponse(STATUS.INTERNAL_SERVER_ERROR, error.message);
    }
}

const removeTrial = async (subscriptionId, res=null) => {
    if (res) res.controller = "removeTrial";
    try {
        const updatedPlan = await subscriptionPlan.findByIdAndUpdate(subscriptionId, {hasTrial : false});
        return updatedPlan;
    }
    catch (error) {
        return errorResponse(STATUS.INTERNAL_SERVER_ERROR, error.message);
    }
}

const addNotificationToSubscription = async (subscriptionId, notification, res=null) => {
    if (res) res.controller = "addNotificationToSubscription";
    try {
        const missedKeys = missingKeys(notification, ['heading', 'body']);
        if (missedKeys.length) {
            return errorResponse(STATUS.BAD_REQUEST, `Missing keys: ${missedKeys.join(', ')}`);
        }
        const addNotification = await subscriptionPlan.findByIdAndUpdate(subscriptionId, {pushNotification : true, notification : notification});
        return addNotification;
    }
    catch (error) {
        return errorResponse(STATUS.INTERNAL_SERVER_ERROR, error.message);
    }
}

const addMenu = async (subscriptionId, menu, res=null) => {
    if (res) res.controller = "addMenu";
    try {
        const subscription = await subscriptionPlan.findById(subscriptionId);
        subscription.menu = [];
        for (let eachMenu of menu) {
            const missedKeys = missingKeys(eachMenu, ['day', 'isVeg', 'menuItems']);
            if (missedKeys.length) {
                return errorResponse(STATUS.BAD_REQUEST, `Missing keys: ${missedKeys.join(', ')}`);
            }
            subscription.menu.push(eachMenu);
        }
        const updatedSubscription = await subscription.save();
        return updatedSubscription;
    }
    catch (error) {
        return errorResponse(STATUS.INTERNAL_SERVER_ERROR, error.message);
    }
}

const fetchPlans = async (res=null) => {
    if (res) res.controller = "listPlans";
    try {
        const plans = await subscriptionPlan.find();
        return plans;
    }
    catch (error) {
        return errorResponse(STATUS.INTERNAL_SERVER_ERROR, error.message);
    }
}

module.exports = {addTrial, fetchPlans};