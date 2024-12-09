const expenditures = require('../models/expenditures.model');
const mongoose = require('mongoose');
const expenses = require('../models/expenses.model');
exports.addExpenditures = async (req, res) => {
    try {
        var obj = {
            title: req.body.title,
            userId: req.user._id,
            categoryId: req.body.categoryId,
            subcategoryId: req.body.subcategoryId,
            createdAt: Date.now()
        }
        if (req.body.subcategoryId == "no") {
            delete obj.subcategoryId;
        }
        const expen = new expenditures(obj)

        expen.save()
            .then(x => {
                return res.status(200).json({
                    "status": "200",
                    "success": true,
                    "msg": "Expenditures Created Sucessfully!!",
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
exports.getAllExpenditures = async (req, res) => {
    try {
        expenditures.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user._id)
                }
            },
            {
                $lookup: {
                    from: "categorys",
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'categoryData'
                }
            },
            {
                $lookup: {
                    from: "subcategorys",
                    localField: 'subcategoryId',
                    foreignField: '_id',
                    as: 'subcategoryData'
                }
            },
            {
                $unwind: {
                    path: '$categoryData',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: '$subcategoryData',
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
                    },
                    subcategoryData: {
                        _id: 1,
                        title: 1,
                    }
                }
            }
        ]).then(x => {
            console.log("Prinitng all datas", x)
            return res.status(200).json({
                "status": "200",
                "success": true,
                res: x,
                "msg": "Expenditures Gets Sucessfully!!",
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
exports.updateExpenditures = async (req, res) => {
    try {
        if (req.body.subcategoryId == "no") {
            expenditures.updateOne(
                {
                    _id: req.body.expendituresId
                },
                {
                    $set: {
                        title: req.body.title,
                        categoryId: req.body.categoryId,
                        updatedAt : Date.now()

                    },
                    $unset: {
                        subcategoryId: ""
                    }
                }
            )
                .then(x => {
                    return res.status(200).json({
                        "status": "200",
                        "success": true,
                        "msg": "Expenditures Updated Sucessfully!!",
                    })
                })
        } else {
            expenditures.updateOne(
                {
                    _id: req.body.expendituresId
                },
                {
                    $set: {
                        title: req.body.title,
                        categoryId: req.body.categoryId,
                        subcategoryId: req.body.subcategoryId,
                        updatedAt : Date.now()
                    },
                }
            )
                .then(x => {
                    return res.status(200).json({
                        "status": "200",
                        "success": true,
                        "msg": "Expenditures Updated Sucessfully!!",
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
exports.deleteExpenditures = async (req, res) => {
    try {
        const expen = await expenses.find({ payOut: req.params.expendituresId });
        if (expen.length > 0) {
            return res.status(200).json({
                "status": "200",
                "success": true,
                "res": 0,
                "msg": "Expenses contains expenditures datas!!!",
            })
        } else {
            expenditures.findByIdAndDelete({ _id: req.params.expendituresId }).then(x => {
                return res.status(200).json({
                    "status": "200",
                    "success": true,
                    "res": 1,
                    "msg": "Expenditures Deleted successfully!!!",
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