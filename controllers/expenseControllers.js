const jwt = require('jsonwebtoken');
const Expense = require("../model/expensemodel");

const secretKey = "secretKey";

module.exports.postExpenseController = (req, res) => {
    console.log(req.body);
    req.token = req.body.token;
    jwt.verify(req.token, secretKey, (err, data) => {
        if (err) {
            console.log(err);
            res.json({
                message: 'invalid token'
            })
        }
        else {
            req.body.UserId= data.user.userId
            Expense.create(req.body)
                .then(result => {
                    console.log(result);
                    res.json(result);
                })
                .catch(err => {
                    console.log(err)
                    res.send(err);
                });
        }
    })
};

module.exports.getExpenseController = (req, res) => {
    console.log(`Customer details are: `);
    console.clear();
    console.log(req.token);
    jwt.verify(req.token, secretKey, (err, data) => {
        if (err) {
            console.log(err);
            res.json({
                message: 'invalid token'
            })
        }
        else {
            console.log(data);
            console.log(data.UserId);
            Expense.findAll({
                where: {
                    UserId: data.user.userId
                }
            })
                .then(result => {
                    console.log(result);
                    res.json(result);
                })
                .catch(err => console.log(err));
        }
    })


};

// for validata token
// const validateToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (typeof token !== "undefined") {
//         req.token = token;
//         next();
//     }
//     else {
//         res.status(403).send({ message: 'invalid authentication' })
//     }
// }
// app.get('/jwt', validateToken, (req, res) => {
//     console.log(req.token);
//     jwt.verify(req.token, secretKey, (err, data) => {
//         if (err) {
//             console.log(err);
//             res.json({
//                 message: 'invalid token'
//             })
//         }
//         else {
//             res.json({
//                 message: 'profile accessed',
//                 data
//             })
//         }
//     })
// })