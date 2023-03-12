const missingKeys = (obj, keys) => {
    if (typeof obj !== 'object') {
        return false;
    }
    return keys.filter(key => !obj[key])
};

const errorResponse = (status, message, next) => {
    const error = new Error(message);
    error.status = status;
    return next(error);
};

module.exports = {missingKeys, errorResponse};