const mongoose = require('mongoose');

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

const vendorModel = new mongoose.Schema({
    vendorId : String,
    disabled : Boolean,
    email : String,
    emailVerified : Boolean,
    displayName : String,
    photoURL : String,
    phoneNumber : String,
    phoneVerified : Boolean,
    currAddress : Number,
    capacity : Number,
    runningSubscriptions : [subscriptionPlan],
    runningTrials : [trialPlans],
    feedbacks : [{
        type : feedback,
        required : true
    }],
    reviews : [{
        type: review,
        required : true
    }],
    avgRating : Number,
    paymentDetails : Object
});

const vendor = mongoose.model('vendor', vendorModel);
