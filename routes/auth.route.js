const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');

router.post('/login',auth.login);
router.post('/verifyotp',auth.verifyotp);

module.exports = router;
