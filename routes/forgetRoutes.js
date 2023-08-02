const express = require('express');
const { postForgetController } = require('../controllers/forgetControllers');
const router=express.Router();

router.post('/forgotpassword',postForgetController)

module.exports=router;