const express = require('express');
const { getPremiumController } = require('../controllers/premiumController');
const router=express.Router();

router.get('/',getPremiumController)

module.exports=router;