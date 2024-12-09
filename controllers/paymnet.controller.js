const payment = require('../models/paymenttype.model');
const expenses = require('../models/expenses.model');
exports.addPayment = async (req, res) => {
    try {
        const pm = new payment({
            title : req.body.title,
            userId : req.user._id
        })
        pm.save()
        .then( x => {
            return res.status(200).json({
                "status": "200",
                "success": true,
                "msg": "Payment Created successfully!!!",
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
exports.getAllPayment = async (req, res) => {
    try {
        payment.find({userId : req.user._id})
        .then( x => {
            return res.status(200).json({
                "status": "200",
                "success": true,
                res : x,
                "msg": "All Payments Gets successfully!!!",
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
exports.updatePayment = async (req, res) => {
    try {
        payment.updateOne({_id : req.body.paymentId},{$set : {title : req.body.title,updatedAt : Date.now()}})
        .then( x => {
            return res.status(200).json({
                "status": "200",
                "success": true,
                "msg": "Payment Updated successfully!!!",
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
exports.deletePayment = async (req, res) => {
    try {
        const expen = await expenses.find({ paymentType: req.params.paymentId });
        if(expen.length > 0){
            return res.status(200).json({
                "status": "200",
                "success": true,
                "res" : 0,
                "msg": "Payment Deleted successfully!!!",
            })
        }else{
            payment.findByIdAndDelete({_id : req.params.paymentId})
            .then( x => {
                return res.status(200).json({
                    "status": "200",
                    "success": true,
                    "res" : 1,
                    "msg": "Payment Deleted successfully!!!",
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