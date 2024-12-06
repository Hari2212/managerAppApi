const expenses = require('../models/expenses.model');
exports.addExpenses = async (req, res) => {
    try {
        const expen = new expenses({
            amount : req.body.amount,
            notes : req.body.notes,
            paymentType : req.body.paymentType,
            payOut : req.body.payOut,
            userId : req.body.userId,
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
        expenses.find({userId : req.query.userId})
        .then(x => {
            return res.status(200).json({
                "status": "200",
                "success": true,
                "response" : x,
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
        expenses.updateOne({_id : req.body.expensesId },{$set : {amount : req.body.amount,notes : req.body.notes,paymentType: req.body.paymentType, payOut:req.body.payOut}})
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