const express = require('express'); 
const router=express.Router();
const { extractToken } = require('../middleware/extractToken');
const { getUserExpenseDownloadController } = require('../controllers/userController');

router.get('/download',extractToken,getUserExpenseDownloadController)

module.exports=router;
