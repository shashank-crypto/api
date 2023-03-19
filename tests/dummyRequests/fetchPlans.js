const fetchPlans = require('../../controllers/getVendors')
const connectDB = require('../../configs/db');

const run = async () => {
    await connectDB();
    await fetchPlans({}, {}, (data) => console.log(data))
}

run()
