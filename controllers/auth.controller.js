const User = require('../models/user.model');
const _ = require("lodash");
exports.login = async (req, res) => {
    try {
        User.findOne({ email: req.body.email }).then(y => {
            if (y) {
                return res.status(200).json({
                    "status": "200",
                    "success": true,
                    // res: y,
                    "msg": "Otp Send Successfully",
                })
            } else {

                const randomSixDigitNumber = 1234;
                const userData = new User({
                    email: req.body.email,
                    otp: randomSixDigitNumber
                })
                userData.save().then(x => {
                    return res.status(200).json({
                        "status": "200",
                        "success": true,
                        // res: x,
                        "msg": "Otp Send Successfully",
                    })
                })
            }

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
exports.verifyotp = async (req, res) => {
    try {
        User.findOne({ email: req.body.email, otp: req.body.otp }).then(user => {
            console.log("user", user)
            if (user) {
                let payload = _.pick(user, ["_id", "email"]);
                const tkn = user.authToken(payload);
                response = {
                    token: "Bearer " + tkn,
                    userId : user._id
                }
                return res.status(200).json({
                    "status": "200",
                    "success": true,
                    response: response,
                    "msg": "Otp Verfied Successfully",
                })
            } else {
                return res.status(400).json({
                    statusCode: "400",
                    msg: "Otp is invalid",
                    success: "false",
                    errors: { errors: ["error in verification Process"] },
                });
            }
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