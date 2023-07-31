const express = require('express');
const { postExpenseController, getExpenseController ,deleteExpenseController} = require('../controllers/expenseControllers');
const router=express.Router();

// for validata token
const extractToken = (req, res, next) => {
    console.log(`in expense route`);
    const token = req.headers['authorization'];
    console.log(token);
    console.log('token extracted');
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
router.delete('/:id',extractToken, deleteExpenseController);

module.exports=router;
