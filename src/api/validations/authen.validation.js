const validator = require('validator')
module.exports = {

    isValidEmailorPhone: (input) => {
        return validator.isEmail(input) || validator.isMobilePhone(input, 'any')
    }
    ,
    isValidPassword: (input) => {
        if (input.length < 8) return false
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        return specialCharRegex.test(input);
    }
    ,
    isPhone: (username) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(username);
    }
    ,
    isEmail: (username) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(username);
    }
}