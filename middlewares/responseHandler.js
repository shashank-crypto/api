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
        res.statusCode = error.status || 500;
        res.error = error.message || "Internal Server Error";
        return res.status(res.statusCode).send({
            status: res.statusCode,
            error: res.error
        });
    }
    next()
}

module.exports = {responseHandler, errorHandler};