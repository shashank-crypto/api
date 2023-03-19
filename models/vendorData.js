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

// !handle running trials and running subscriptions
const vendorModel = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    disabled : {
        type: Boolean,
        default: false
    },
    email : {
        type : String,
        required : true
    },
    emailVerified : Boolean,
    displayName : {
        type : String,
        required : true
    },
    photoURL : String,
    phoneNumber : String,
    phoneVerified : Boolean,
    runningSubscriptions : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subscription'
    }],
    feedbacks : [{
        type : feedback,
        required : true
    }],
    reviews : [{
        type: review,
        required : true
    }],
    avgRating : Number,
    currAddress : {
        type: Number, 
        default : 0
    },
    savedAddresses : [{
        type : address,
        required : true
    }],
    paymentDetails : Object
});

const vendor = mongoose.model('vendor', vendorModel);
