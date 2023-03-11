// handle response , set status code and send response
const responseHandler = (req, res) => {
    console.log("Response Handler");
    return res.status(res.statusCode).send({
        status: res.statusCode,
        message: res.message,
        data: res.data
    });
}

const errorHandler = (err, req, res, next) => {
    console.log("Error Handler");
    if (err) {
        console.log("Erorr Object Created", res.controller);
        res.statusCode = 500;
        res.message = "Internal Server Error";
        res.data = null;
    }
    next()
}

module.exports = {responseHandler, errorHandler};