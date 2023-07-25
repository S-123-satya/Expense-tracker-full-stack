const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const sequelize = require('./util/db');
const User = require('./model/dbmodel');
const { isBooleanObject } = require('util/types');
const { json } = require('body-parser');
const bodyParser = require('body-parser');
const Expense = require('./model/expensemodel');
const app = express();

const port=3000;
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.post('/', (req, res) => {
    console.log(`req.body.name=${req.body.name}`);
    console.log(`req.body.email=${req.body.email}`);
    console.log(`req.body.password=${req.body.password}`);
    console.log(`req.body.User=${req.body}`);
    bcrypt.hash(req.body.password, 10)
        .then(function (hash) {
            // Store hash in your password DB.
            req.body.password = hash;
            User.create(req.body)
                .then(result => {
                    console.log(result);
                    res.json(result);
                    // res.redirect('/');
                })
                .catch(err => {
                    console.log(err)
                    res.send(err);
                });
        });
})

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','login.html'))
})

app.post('/login', (req, res) => {
    console.log(`req.body.email=${req.body.email}`);
    console.log(`req.body.password=${req.body.password}`);
    console.log(`req.body.User=${req.body}`);
    User.findAll({
        where: {
            email: req.body.email
        }
    })
        .then(result => {
            if (result.length === 0) {
                res.status(404);
                res.json({ name: "user does not Exists" });
            }
            bcrypt.compare(req.body.password, result[0].dataValues.password)
                .then(function (resu) {
                    // result == true
                    if (resu === true) {
                        console.log(result[0].dataValues);
                        res.json({name:result[0].dataValues.name,userId:result[0].dataValues.id,email:result[0].dataValues.email});
                    }
                    else {
                        console.log(hash);
                        console.log(`password not matched`);
                        // console.log(object);
                        res.status(401);
                        res.json({ name: "user password is not correct" });
                    }
                });

            console.log(`result`);
            console.log(result);
        })
        .catch(err => {
            console.log(err)
            res.send(err);
        });
})

app.get('/expense', (req, res) => {
    // res.json({name:'message connected'});
    res.sendFile(path.join(__dirname, 'expense.html'));
})

app.post('/expense',(req,res)=>{
    console.log(req.body);
    Expense.create(req.body)
    .then(result => {
        console.log(result);
        res.json(result);
        // res.redirect('/');
    })
    .catch(err => {
        console.log(err)
        res.send(err);
    });
})

app.get('/expensedata', (req, res) => {
    // res.json({name:'message connected'});
    console.log(`Customer details are: `);
    console.clear();
    console.log(req.headers.authorization);
    // console.log(req);
    Expense.findAll({
        where:{
            UserId:req.headers.authorization
        }
    })
    .then(result=>{
        console.log(result);
        res.json(result);
    })
    .catch(err=>console.log(err));
})

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync({ force: false })
    .then(result => console.log(`connected to data base`))
    .catch(err => console.log(err));

// sequelize.authenticate()
// .then(con=>console.log(con))
// .catch(err=>console.log(err));
app.listen(port, console.log(`listening on port 3000`));
