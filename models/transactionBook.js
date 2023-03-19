const mongoose = require('mongoose');

const transaction = new mongoose.Schema({
    userId: {
        type : String,
        required : true
    },
    vendorId: {
        type : String,
        required : true
    },
    heading : {
        type : String,
        required : true
    },
    items: [String],
    priceBreakUp : Object,
    totalAmount : {
        type : Number,
        required : true
    },
    paymentMethod : {
        type : String,
        required : true
    },
    transactionRecord : {
        type : Object
    }
})

module.exports = mongoose.model('Transaction', transaction);

/*
if (canCancel) 
    PlanPeriod * price = totalAmount
else 
    priceForPeriod/PlanPeriod * subscribedPeriod = totalAmount
PlanPrice * Period
*/