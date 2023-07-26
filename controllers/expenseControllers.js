const Expense = require("../model/expensemodel");


module.exports.postExpenseController = (req, res) => {
    console.log(req.body);
    Expense.create(req.body)
        .then(result => {
            console.log(result);
            res.json(result);
        })
        .catch(err => {
            console.log(err)
            res.send(err);
        });
};

module.exports.getExpenseController = (req, res) => {
    console.log(`Customer details are: `);
    console.clear();
    console.log(req.headers.authorization);
    Expense.findAll({
        where: {
            UserId: req.headers.authorization
        }
    })
        .then(result => {
            console.log(result);
            res.json(result);
        })
        .catch(err => console.log(err));
};