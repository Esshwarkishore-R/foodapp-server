const mongoose = require('mongoose');

var mongoURL = 'mongodb+srv://user1:xvvWVU7aFwHbKlFB@project1.pw37u.mongodb.net/food-app'

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })

var db = mongoose.connection

db.on('connected', () => {
    console.log('Database is connected successfully');
})

db.on('error', () => {
    console.log('Database connection failed');
})

module.exports = mongoose