const mongoose = require('mongoose');

const subcategoriesSchema = mongoose.Schema({
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
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'categorys'
    }
})

module.exports = mongoose.model('subcategorys',subcategoriesSchema);