const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./model/dbmodel');
const Expense = require('./model/expensemodel');
const sequelize = require('./util/db');
const signupRoutes = require('./routes/signupRoutes'); 
const expenseRoutes = require('./routes/expenseRoutes'); 
const loginRoutes = require('./routes/loginRoutes'); 

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json()); //we are using express.json which uses body-parser in background in order to parse only json request from body
app.use(express.static(path.join(__dirname, 'public')))

app.use('/signup',signupRoutes);
app.use('/login',loginRoutes);
app.use('/expense',expenseRoutes);

// app.post('/', (req, res) => {
//     console.log(`req.body.name=${req.body.name}`);
//     console.log(`req.body.email=${req.body.email}`);
//     console.log(`req.body.password=${req.body.password}`);
//     console.log(`req.body.User=${req.body}`);
//     bcrypt.hash(req.body.password, 10)
//         .then(function (hash) {
//             // Store hash in your password DB.
//             req.body.password = hash;
//             User.create(req.body)
//                 .then(result => {
//                     console.log(result);
//                     res.json(result);
//                 })
//                 .catch(err => {
//                     console.log(err)
//                     res.send(err);
//                 });
//         });
// })

// app.post('/login', (req, res) => {
//     console.log(`req.body.email=${req.body.email}`);
//     console.log(`req.body.password=${req.body.password}`);
//     console.log(`req.body.User=${req.body}`);
//     User.findAll({
//         where: {
//             email: req.body.email
//         }
//     })
//         .then(result => {
//             if (result.length === 0) {
//                 res.status(404);
//                 res.json({ name: "user does not Exists" });
//             }
//             bcrypt.compare(req.body.password, result[0].dataValues.password)
//                 .then(function (resu) {
//                     if (resu === true) {
//                         console.log(result[0].dataValues);
//                         res.json({ name: result[0].dataValues.name, userId: result[0].dataValues.id, email: result[0].dataValues.email });
//                     }
//                     else {
//                         console.log(hash);
//                         console.log(`password not matched`);
//                         res.status(401);
//                         res.json({ name: "user password is not correct" });
//                     }
//                 });

//             console.log(`result`);
//             console.log(result);
//         })
//         .catch(err => {
//             console.log(err)
//             res.send(err);
//         });
// })


// app.post('/expense', (req, res) => {
//     console.log(req.body);
//     Expense.create(req.body)
//         .then(result => {
//             console.log(result);
//             res.json(result);
//         })
//         .catch(err => {
//             console.log(err)
//             res.send(err);
//         });
// })

// app.get('/expensedata', (req, res) => {
//     console.log(`Customer details are: `);
//     console.clear();
//     console.log(req.headers.authorization);
//     Expense.findAll({
//         where: {
//             UserId: req.headers.authorization
//         }
//     })
//         .then(result => {
//             console.log(result);
//             res.json(result);
//         })
//         .catch(err => console.log(err));
// })

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync({ force: false })
    .then(result => console.log(`connected to data base`))
    .catch(err => console.log(err));

// sequelize.authenticate()
// .then(con=>console.log(con))
// .catch(err=>console.log(err));
app.listen(port, console.log(`listening on port 3000`));
