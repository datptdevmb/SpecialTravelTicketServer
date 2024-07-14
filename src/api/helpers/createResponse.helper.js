function createResponse(code, msg, status, data = {}) {
    return {
        code,
        msg,
        status,
        ...data
    };
};

module.exports = {
    createResponse
};
