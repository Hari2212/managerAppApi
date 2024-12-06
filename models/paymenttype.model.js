const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    title : {
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
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'users'
    },
})

module.exports = mongoose.model('payments',paymentSchema);