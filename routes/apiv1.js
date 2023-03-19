const experss = require('express');
const router = experss.Router();

const userRouter = require('./user');
const vendorRouter = require('./vendor');

router.use("/user", userRouter);
router.use("/vendor", vendorRouter);
router.get("/", (req, res, next) => {
    res.controller = {
        endpoint : "apiv1",
        function : "unkown"
    }
    console.log("API V1");
    res.statusCode = 200;
    res.message = "API V1";
    res.data = null;
    // throw new Error("Error");
    return next();
});

module.exports = router;