const Category = require('../models/category.model');
const mongoose = require('mongoose');
const CustomObjectId = mongoose.Types.ObjectId;


exports.addCategory = async (req, res) => {
    try {
        const cgry = new Category({
            title: req.body.title,
            userId : req.body.userId
        })
       
        cgry.save().then(x => {
            return res.status(200).json({
                "status": "200",
                "success": true,
                "msg": "Category Created Sucessfully!!",
            })
        })

    } catch (err) {
        return res.status(422).json({
            "statusCode": "422",
            "msg": "",
            "success": false,
            "user": {},
            "error": err.message
        });
    }
}
exports.getAllCategory = async (req, res) => {
    try {
        Category.find({userId : req.query.userId})
        .then(x => {
            return res.status(200).json({
                "status": "200",
                "success": true,
                "response" : x,
                "msg": "Gets all category successfully!!!",
            })
        })
    } catch (err) {
        return res.status(422).json({
            "statusCode": "422",
            "msg": "",
            "success": false,
            "user": {},
            "error": err.message
        });
    }
}
exports.updateCategory = async (req, res) => {
    try {
        Category.updateOne({userId : req.body.userId,_id : req.body.categoryId },{$set : {title : req.body.title}})
        .then(x => {
            return res.status(200).json({
                "status": "200",
                "success": true,
                res : x,
                "msg": "Category Updated successfully!!!",
            })
        })
    } catch (err) {
        return res.status(422).json({
            "statusCode": "422",
            "msg": "",
            "success": false,
            "user": {},
            "error": err.message
        });
    }
}
exports.deleteCategory = async (req, res) => {
    try {
        Category.findByIdAndDelete({_id : req.params.categoryId}).then(x => {
            return res.status(200).json({
                "status": "200",
                "success": true,
                "msg": "Category Deleted successfully!!!",
            })
        })
    } catch (err) {
        return res.status(422).json({
            "statusCode": "422",
            "msg": "",
            "success": false,
            "user": {},
            "error": err.message
        });
    }
}