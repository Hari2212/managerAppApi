const Category = require('../models/category.model');
const mongoose = require('mongoose');
// const CustomObjectId = mongoose.Types.ObjectId;
const subcategory = require('../models/subcategory.model');
const expenditures = require('../models/expenditures.model');

exports.addCategory = async (req, res) => {
    try {
        // console.log("getting resonse from middlewere",req.user)
        // res.send(req.user);
        // return;
        const cgry = new Category({
            title: req.body.title,
            userId: req.user._id
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
        Category.find({ userId: req.user._id })
            .then(x => {
                return res.status(200).json({
                    "status": "200",
                    "success": true,
                    "response": x,
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
        Category.updateOne({ userId: req.user._id, _id: req.body.categoryId }, { $set: { title: req.body.title,updateddAt : Date.now() } })
            .then(x => {
                return res.status(200).json({
                    "status": "200",
                    "success": true,
                    res: x,
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
        const subcategoryData = await subcategory.find({ categoryId: req.params.categoryId })
        const expen = await expenditures.find({ categoryId: req.params.categoryId })
        if (subcategoryData.length > 0 || expen.length > 0) {
            return res.status(200).json({
                "status": "200",
                "success": true,
                "res": 0,
                "msg": "Category contains subcategory datas!!!",
            })
        } else {
            Category.findByIdAndDelete({ _id: req.params.categoryId }).then(x => {
                return res.status(200).json({
                    "status": "200",
                    "success": true,
                    "res": 1,
                    "msg": "Category Deleted successfully!!!",
                })
            })
        }
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