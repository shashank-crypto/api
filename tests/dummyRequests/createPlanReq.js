const createPlan = require("../../controllers/createPlan")
const { addTrial } = require('../../services/subsrciption');
const subscriptionPlan = require('../../models/subscriptionPlan');
const connectDB = require("../../configs/db");

const req = {
    body : {
        planData : {
            subscriptionName: "Breakfast",
            vendorId: "5f9f1b9b9c9b8c2b8c8b8b8b",
            session: "breakfast",
            planType: "daily",
            pricePerDay: 100,
            // pricePerWeek: 500,
            pricePerMonth: 2000,
            description: "This is a breakfast plan",
            canPause: true,
            isRefundable: true,
            inactiveDays: [
                0
            ],
        },
        vendor : {
            vendorId: "5f9f1b9b9c9b8c2b8c8b8b8b",
            emailVerified: true,
            phoneVerified: true,
            disabled: false
        }
    }
}


const test = async () => {
    await connectDB()
    createPlan(req, {}, (data) => console.log(data))
    // const data = await subscriptionPlan.find({vendorId : "5f9f1b9b9c9b8c2b8c8b8b8b"});
    // const update = await addTrial(data[0], {minDays : 3, pricePerDay : 160});
    // console.log(update)
}

test()
