const payment = require('../models/paymenttype.model');
exports.addPayment = async (req, res) => {
    try {
        const pm = new payment({
            title : req.body.title,
            userId : req.body.userId
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
        payment.find({userId : req.query.userId})
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
        payment.updateOne({_id : req.body.paymentId},{$set : {title : req.body.title}})
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
        payment.findByIdAndDelete({_id : req.params.paymentId})
        .then( x => {
            return res.status(200).json({
                "status": "200",
                "success": true,
                "msg": "Payment Deleted successfully!!!",
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