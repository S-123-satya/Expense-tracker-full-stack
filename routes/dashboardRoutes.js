const express = require('express');
const { verify } = require('jsonwebtoken');
const User = require('../model/userModel');
const Expense = require('../model/expensemodel');
const router = express.Router();

const extractToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log('token extracted');
    if (typeof token !== "undefined") {
        req.token = token;
        next();
    }
    else {
        res.status(403).send({ message: 'invalid authentication' })
    }
}

router.get('/', extractToken, async (req, res) => {
    const expenses = await Expense.findAll();
    const user = await User.findAll();
    // user.map()
    console.log(user);
    const amount = {};
    expenses.forEach(expense => {
        if (amount[Number.parseInt(expense.UserId)]) {
            amount[Number.parseInt(expense.UserId)] += expense.expenseInput;
        }
        else
        amount[Number.parseInt(expense.UserId)] = expense.expenseInput?expense.expenseInput: 0;
    })
    const data=[];
    user.forEach(obj=>{
        data.push({name:obj.name,expense:amount[obj.id]})
    });
    console.log(data);
    console.log(amount);
    const d=data.sort((a,b)=>b.expense - a.expense);
    console.log(data);
    console.log(d);
    res.json({ data: d});
})

module.exports = router;
