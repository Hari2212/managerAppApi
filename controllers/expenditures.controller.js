const expenditures = require('../models/expenditures.model');

exports.addExpenditures = async (req, res) => {
    try {
        const expen = new expenditures({
            title: req.body.title,
            userId: req.body.userId,
            categoryId: req.body.categoryId,
            subcategoryId: req.body.subcategoryId
        })

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
        expenditures.find({ userId : req.body.userId})
        .then(x => {
            return res.status(200).json({
                "status": "200",
                "success": true,
                res : x,
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
        expenditures.updateOne({ _id : req.body.expendituresId},{$set : { title : req.body.title,categoryId : req.body.categoryId ,subcategoryId : req.body.subcategoryId}})
        .then(x => {
            return res.status(200).json({
                "status": "200",
                "success": true,
                "msg": "Expenditures Updated Sucessfully!!",
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
exports.deleteExpenditures = async (req, res) => {
    try {
        expenditures.findByIdAndDelete({_id : req.params.expendituresId}).then(x => {
            return res.status(200).json({
                "status": "200",
                "success": true,
                "msg": "Expenditures Deleted successfully!!!",
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