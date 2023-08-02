const express = require('express');
const { postForgetController,postotpController } = require('../controllers/forgetControllers');
const router=express.Router();

router.post('/forgotpassword',postForgetController)
router.post('/forgotpassword/otp',postotpController)

module.exports=router;