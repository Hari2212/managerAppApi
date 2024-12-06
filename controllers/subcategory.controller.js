const subcategory = require('../models/subcategory.model');
const mongoose = require('mongoose');
exports.addSubCategory = async (req, res) => {
    try {
        const scatry = new subcategory({
            title: req.body.subCategoryTitle,
            userId: req.body.userId,
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
        console.log(req.query.userId)
        subcategory.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.query.userId)
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
        subcategory.updateOne({ _id: req.body.subCategoryId }, { $set: { title: req.body.title,categoryId : req.body.categoryId } })
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
        subcategory.findByIdAndDelete({ _id: req.params.subCategoryId }).then(x => {
            return res.status(200).json({
                "status": "200",
                "success": true,
                "msg": "Subcategory Deleted successfully!!!",
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


exports.getcategoryBasedSubCategory = async (req, res) => {
    try {
        subcategory.find({ _id: req.query.subCategoryId }).then(x => {
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

