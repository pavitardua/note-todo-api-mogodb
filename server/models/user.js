const mongoose = require('mongoose');
var User = mongoose.model('User',{
    name:{
        type: String,
        required: true,
        minlenght: 1,
        trim: true
    },
    email:{
        type: String,
        required: true,
        minlenght: 1,
        trim: true   
    },
    password:{
        type: String
    }
});
module.exports = {User};
