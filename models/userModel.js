const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    token: { type: String }
}, {
    timestamps: true,
})

module.exports = mongoose.model('users', userSchema)