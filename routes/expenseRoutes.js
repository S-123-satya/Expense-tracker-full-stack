const express = require('express');
const { postExpenseController, getExpenseController } = require('../controllers/expenseControllers');
const router=express.Router();

// for validata token
const extractToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (typeof token !== "undefined") {
        req.token = token;
        next();
    }
    else {
        res.status(403).send({ message: 'invalid authentication' })
    }
}
// router.use(extractToken);
router.get('/',extractToken,getExpenseController);
router.post('/',postExpenseController);

module.exports=router;
