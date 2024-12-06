const mongoose = require('mongoose');

const expensesSchema = mongoose.Schema({
    amount : {
        type : String,
        required : true,
    },
    notes : {
        type : String,
        required : false,
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    updateddAt : {
        type : Date,
        default : Date.now()
    },
    paymentType : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'payments'
    },
    payOut : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'expenditures'
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'users'
    }
})

module.exports = mongoose.model('expenses',expensesSchema);