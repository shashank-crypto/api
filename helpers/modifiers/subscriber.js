// can activate their own info, add addresses, add payment methods, etc.
// can add new subsctiptions

const User = require("../../models/userData");

// is a subscriber to a subscription plan
const isSubscriber = async (subscriptionId, userId, res=null) => {
    if (res) res.controller = "isSubscriber";
    try {
        const user = await User.findById(userId);
        if (!user)
            return errorResponse(STATUS.NOT_FOUND, "User not found");
        for (let subscription of user.history.subscriptions) {
            if (subscription.subscriptionId.toString() === subscriptionId.toString())
                return true;
        }
        return false;
    }
    catch (error) {
        return errorResponse(STATUS.INTERNAL_SERVER_ERROR, error.message);
    }
}