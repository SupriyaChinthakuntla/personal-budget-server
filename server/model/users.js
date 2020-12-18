const mongoose = require('mongoose');
 
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    repassword: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
},{collection : 'user'})
 
const users = mongoose.model('user',userSchema);

module.exports = users;