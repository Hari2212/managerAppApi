const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    updatedAt : {
        type : Date,
        default : Date.now()
    },
    otp : {
        type : Number,
        reduired : false
    },
    active : {
        type : Boolean,
        default : true
    }
})
userSchema.methods.authToken = function (payload){
    console.log("getting data",process.env.SECRET)
    const token = jwt.sign(payload,process.env.SECRET,{
        algorithm : "HS512",
        expiresIn : "1d"
    })
    return token;
}
module.exports = mongoose.model('user',userSchema);