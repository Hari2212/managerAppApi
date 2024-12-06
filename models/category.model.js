const mongoose = require('mongoose');

const categoriSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    updateddAt : {
        type : Date,
        default : Date.now()
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'users'
    }
})

module.exports = mongoose.model('categorys',categoriSchema);