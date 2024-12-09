const expenses = require('../models/expenses.model');
const mongoose = require('mongoose');
exports.addExpenses = async (req, res) => {
    try {
        const expen = new expenses({
            amount : req.body.amount,
            notes : req.body.notes,
            paymentType : req.body.paymentType,
            payOut : req.body.payOut,
            userId : req.user._id,
        })
        expen.save()
        .then( x => {
            return res.status(200).json({
                "status": "200",
                "success": true,
                "msg": "Expenses Created Sucessfully!!",
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
exports.getAllExpenses = async (req, res) => {
    try {
        let obj = {};
        if(req.query.getType == "ALL"){
            obj =   {
                userId: new mongoose.Types.ObjectId(req.user._id)
            }
        }else if(req.query.getType == "FY"){

            const [startYear, endYear] = req.query.date.split(" - ").map(Number);
            const startOfYear = new Date(`${startYear}-04-01`);
            const endOfYear = new Date(`${endYear}-03-31`);
            obj =   {
                userId: new mongoose.Types.ObjectId(req.user._id),
                createdAt: {
                    $gte: startOfYear,
                    $lte: endOfYear   
                }   
            }
        }else if(req.query.getType == "SD"){
            const [startYear, endYear] = req.query.date.split("*");
            const startOfYear = new Date(startYear);
            const endOfYear = new Date(endYear);
            obj =   {
                userId: new mongoose.Types.ObjectId(req.user._id),
                createdAt: {
                    $gte: startOfYear,
                    $lte: endOfYear,  
                }   
            }
        }else{
            obj =   {
                userId: new mongoose.Types.ObjectId(req.user._id)
            }
        }
        // console.log("Printing params",req.query.getType);
        //     return res.send(obj);
            
        expenses.aggregate([
            {
                $match: obj
            },
            {
                $lookup: {
                    from: "payments",
                    localField: 'paymentType',
                    foreignField: '_id',
                    as: 'paymentTypes'
                }
            },
            {
                $lookup: {
                    from: "expenditures",
                    localField: 'payOut',
                    foreignField: '_id',
                    as: 'payOutData'
                }
            },
            {
                $unwind: {
                    path: '$paymentTypes',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: '$payOutData',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    amount: 1,
                    notes: 1,
                    createdAt: 1,
                    paymentTypes: {
                        _id: 1,
                        title: 1,
                    },
                    payOutData : {
                        _id: 1,
                        title: 1,
                    }
                }
            }
        ])
        .then(x => {
            return res.status(200).json({
                "status": "200",
                "success": true,
                "response" : x,
                // "rez" :  obj,
                "msg": "Gets all Expenses successfully!!!",
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
exports.updateExpenses = async (req, res) => {
    try {
        expenses.updateOne({_id : req.body.expensesId },{$set : {amount : req.body.amount,notes : req.body.notes,paymentType: req.body.paymentType, payOut:req.body.payOut,updatedAt : Date.now()}})
        .then(x => {
            return res.status(200).json({
                "status": "200",
                "success": true,
                "msg": "Expenses Updated successfully!!!",
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
exports.deleteExpenses = async (req, res) => {
    try {
        expenses.findByIdAndDelete({_id : req.params.expensesId}).then(x => {
            return res.status(200).json({
                "status": "200",
                "success": true,
                "msg": "Expenses Deleted successfully!!!",
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