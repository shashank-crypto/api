const missingKeys = (obj, keys, next = null) => {
    if (typeof obj !== 'object') {
        return keys;
    }
    const missingKeys =  keys.filter(key => !obj[key])
    // ! need to validate this condition
    if (next && typeof next == 'function' && missingKeys > 0) {
        return errorResponse(STATUS.BAD_REQUEST, `Missing keys: ${missingKeys.join(', ')}`, next);
    }
    return missingKeys;
};

const errorResponse = (status, message, next=null) => {
    const error = new Error(message);
    error.status = status;
    if (!next) return error;
    return next(error);
};

module.exports = {missingKeys, errorResponse};