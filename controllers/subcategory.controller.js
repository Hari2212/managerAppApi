const subcategory = require('../models/subcategory.model');
const expenditures = require('../models/expenditures.model');
const mongoose = require('mongoose');
exports.addSubCategory = async (req, res) => {
    try {
        const scatry = new subcategory({
            title: req.body.subCategoryTitle,
            userId: req.user._id,
            categoryId: req.body.categoryId
        });

        scatry.save()
            .then(x => {
                return res.status(200).json({
                    "status": "200",
                    "success": true,
                    "msg": "Subcategory Saved successfully!!!",
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
exports.getAllSubCategory = async (req, res) => {
    try {
        console.log("Prinitng data", req.user._id)
        subcategory.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user._id)
                }
            },
            {

                $lookup: {
                    from: 'categorys',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'categoryData'
                }
            },
            {
                $unwind: {
                    path: '$categoryData',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    createdAt: 1,
                    categoryData: {
                        _id: 1,
                        title: 1,
                    }
                }
            }
        ]).then(x => {
            return res.status(200).json({
                "status": "200",
                "success": true,
                res: x,
                "msg": "Subcategory Gets successfully!!!",
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
exports.updateSubCategory = async (req, res) => {
    try {
        subcategory.updateOne({ _id: req.body.subCategoryId }, { $set: { title: req.body.title, categoryId: req.body.categoryId,updateddAt: Date.now() } })
            .then(x => {
                return res.status(200).json({
                    "status": "200",
                    "success": true,
                    "msg": "Subcategory Updated successfully!!!",
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
exports.deleteSubCategory = async (req, res) => {
    try {
        const expenditure = await expenditures.find({ subcategoryId: req.params.subCategoryId });
        if (expenditure.length > 0) {
            return res.status(200).json({
                "status": "200",
                "success": true,
                "res" : 0,
                "msg": "Subcategory Contains expenditures datas!!!",
            })
        } else {
            subcategory.findByIdAndDelete({ _id: req.params.subCategoryId }).then(x => {
                return res.status(200).json({
                    "status": "200",
                    "success": true,
                    "res" : 1,
                    "msg": "Subcategory Deleted successfully!!!",
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


exports.getcategoryBasedSubCategory = async (req, res) => {
    try {
        subcategory.find({ categoryId: req.query.categoryId }).then(x => {
            return res.status(200).json({
                "status": "200",
                "success": true,
                res: x,
                "msg": "All subcategory Gets successfully!!!",
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

