const mongoose = require('mongoose');
const pointSchema = require('./pointSchema');

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

const subscriptionInfo = {
    subscriptionId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subscription'
    },
    vendorId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendor'
    },
    price : Number,
    startDate : Date,
    endDate : Date,
    status : String, // active, inactive, cancelled
    savedAdderss : Number
}

const trialInfo = {
    trialId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trial'
    },
    vendorId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendor'
    },
    startDate : {
        type: Date,
        required : true
    },
    endDate : Date,
    trialPrice : Number,
    savedAdderss : {
        type: Number,
        default : 0
    } // index of the address in the savedAddresses array
}

const userModel = new mongoose.Schema({
    userId : {
        type: String, 
        unique : true,
        index : true
    },
    email : {
        type: String, 
        unique : true
    },
    emailVerified : {
        type: Boolean, 
        default : false
    },
    phoneNumber : {
        type: String, 
        unique : true
    },
    phoneVerified : {
        type: Boolean, 
        default : false
    },
    displayName : {
        type: String, 
        unique : true
    },
    photoURL : {
        type: String, 
        default : "true"
    },
    disabled : Boolean,
    currAddress : {
        type: Number, 
        default : 0
    }, //will contain the index of the address in the savedAddresses array
    savedAddresses : [address],
    isAdmin : { 
        type: Boolean,
        default : false
    },
    orders : [String],
    subscriptionInfo : { // can have multiple subscriptions, but only one active subscription per session
        breakfast: subscriptionInfo,
        lunch: subscriptionInfo,
        dinner: subscriptionInfo
    },
    hasActiveSubscription : Boolean,
    hasTrial : Boolean,
    history : {
        subscriptions : [{
            subscription : {
                type: subscriptionInfo,
                required : true
            },
            invoice : {
                type: Object,
                required : true
            }
        }],
        trials : [{
            subscription : {
                type: trialInfo,
                required : true
            },
            invoice : {
                type: Object,
                required : true
            }
        }]
    }
});

// want to create a subscriptionInfo object which is a subscription for taking a food delivery service, food delivers each day with a certain menu, and the user can choose to subscribe to it or not


module.exports = mongoose.model('user', userModel);