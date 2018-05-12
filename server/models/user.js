const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcyrpt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
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
        trim: true,
        unique:true,
        validate:{
            validator: validator.isEmail,
            message:'{VALUE} is no a valid email'
        }   
    },
    password:{
        type: String,
        required: true,
        minlenght: 6
    },
    tokens: [{
        access:{
            type: String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]
});

//model method
//User.findByToken
//instance method
//user.generatAuthToken

//overriding
UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject,['_id','email']);
};

//arrow functions do not bind this keyword, so we are using regular function
UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
    user.tokens = user.tokens.concat([{access,token}]);

    return user.save().then(()=>{
        return token;
    });
};

UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token,'abc123');
    } catch (e){
        // return new Promise((resolve,reject)=>{
        //     reject();
        // });
        return Promise.reject();
    }
    
    return User.findOne({
       "_id":decoded._id,
        "tokens.token": token,
        "tokens.access": 'auth'
    });
};

UserSchema.pre('save',function(next){
    var user = this;
    if(user.isModified('password')){
        bcyrpt.genSalt(10,(err,salt)=>{
            bcyrpt.hash(user.password,salt,(err,hash)=>{
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
    
}) ;  

var User = mongoose.model('User',UserSchema);
module.exports = {User};
