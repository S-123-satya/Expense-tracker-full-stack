const express = require('express');
const { postSignUpController } = require('../controllers/signupController');
const router=express.Router();

router.post('/',postSignUpController)

module.exports=router;