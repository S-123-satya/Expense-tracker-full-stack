const express = require('express');
const { postPremiumController } = require('../controllers/premiumController');
const router=express.Router();

router.get('/',postPremiumController)

module.exports=router;