const mongoose = require('mongoose');

const menu = {
    day : Number, // 0 for sunday, 1 for monday, 2 for tuesday, and so on
    menuItems : [String],
    isVeg : Boolean,
    isJain : {
        type: Boolean,
        default: false
    },
    isGlutenFree : {
        type : Boolean,
        default: false
    },
    isLactoseFree : {
        type : Boolean,
        default: false
    },
    isKeto : {
        type : Boolean, 
        default: false
    },
    isLowCalorie : {
        type : Boolean,
        default : false
    },
    calories : Number, // in kcal
    desciption : String,
    image : String
}

const feedback = {
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    feedback : String,
    date : {
        type: Date,
        default: Date.now()
    }
}

const review = {
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    rating : Number,
    review : String,
    date : {
        type: Date,
        default: Date.now()
    }
}

// should I add subscribers array here?

const subscription = new mongoose.Schema({
    subscriptionName : String,
    vendorId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendor'
    },
    session : {
        type: String, 
        enum: ['breakfast', 'lunch', 'dinner'],
        required: true
    }, // breakfast, lunch, dinner
    planType : {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'any'],
        required: true
    }, // daily, weekly, monthly, any -> if any, then the user can choose the number of days, weeks, or months
    pricePerDay : Number, // if planType is daily
    pricePerWeek : Number, // if planType is weekly
    pricePerMonth : Number, // if planType is monthly
    desciption : String,
    pushNotification : Boolean,
    notification : {
        heading: String,
        body: String
    }, // if vendor wants to send a notification to the user with the subscription
    canPause : Boolean, // if the user can pause the subscription
    isRefundable : Boolean, // in case user wants to cancel the subscription
    inactveDays : [Number], // days when vendor will not deliver food, 0 for sunday, 1 for monday, 2 for tuesday, and so on
    menu : [menu], // menu for each day
    feedbacks : [{
        type: feedback,
        required: true
    }], // feedbacks from the user
    reviews : [{
        type : review,
        required : true
    }], // reviews from the user
    avgRating : Number, // average rating of the subscription
})

module.exports = mongoose.model('subscription', subscription);
