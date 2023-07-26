const express = require('express');
const { postLoginController } = require('../controllers/loginControllers');
const router=express.Router();

router.post('/',postLoginController)

module.exports=router;