const mongoose = require('mongoose');
const pointSchema = require('./pointSchema');

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

const address = {
    addressName : String,
    flat : String,
    street : String,
    area : String,
    city : String,
    state : String,
    pincode : String,
    landmark : String,
    phone : String,
    completeAddress : String,
    lat : Number,
    long : Number,
    location : {
        type: pointSchema,
        index: '2dsphere',
        required : true
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
    address : address,
    paymentDetails : Object
});

const vendor = mongoose.model('vendor', vendorModel);
