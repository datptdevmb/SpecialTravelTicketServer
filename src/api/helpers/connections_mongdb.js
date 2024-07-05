const mongoose = require('mongoose')
const dbcogfig = require('../../config/database.config')




// Kết nối đến MongoDB
mongoose.connect(dbcogfig.uri)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

module.exports = mongoose.connection