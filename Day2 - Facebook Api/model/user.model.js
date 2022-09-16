const mongoose = require("mongoose");


var userSchema = mongoose.Schema({
    uid: String,
    email: String,
    name: String,
    pic: String
});

const user = mongoose.model('User', userSchema);

module.exports = user;