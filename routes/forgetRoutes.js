const express = require('express');
const { postForgetController,postresetpasswordController } = require('../controllers/forgetControllers');
const router=express.Router();

router.post('/forgotpassword',postForgetController)
router.get('/resetpassword/:uuid',postresetpasswordController)

module.exports=router;