const mongoose = require('mongoose');

const expendituresSchema = mongoose.Schema({
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
    },
    subcategoryId : {
        type : mongoose.Schema.Types.ObjectId,
        required : false,
    }
})

module.exports = mongoose.model('expenditures',expendituresSchema);