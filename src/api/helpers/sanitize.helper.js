const sanitize = (input) => {
    return input.replace(/[^\w\s]/gi, '');
};

module.exports = {
    sanitize
};
