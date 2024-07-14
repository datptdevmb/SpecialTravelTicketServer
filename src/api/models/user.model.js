
const mongoose = require("mongoose");
const { Schema, Types } = require("mongoose");


const UserSchema = new Schema(
    {

        username:
        {
            type: String,
            require: true,
            unique: true,

        },
        password:
        {
            type: String,
        },
        email: {
            type: String
        },
        fullname:
        {
            type: String,
        },
        phoneNumber:
        {
            type: String,
        },
        userType:
        {
            type: String,
            enum: ['buyer', 'seller'],
        },
        addresses:
            [{
                type: Types.ObjectId,
                ref: 'Address'
            }]
    }

)

module.exports = User = mongoose.model('users', UserSchema)