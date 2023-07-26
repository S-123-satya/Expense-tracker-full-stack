const express = require('express');
const { postExpenseController, getExpenseController } = require('../controllers/expenseControllers');
const router=express.Router();

router.get('/',getExpenseController);
router.post('/',postExpenseController);

module.exports=router;