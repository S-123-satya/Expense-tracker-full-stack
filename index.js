const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./util/db');
const User = require('./model/dbmodel');
const { isBooleanObject } = require('util/types');
const { json } = require('body-parser');
const bodyParser = require('body-parser');
const app = express();

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
            console.log(`result`);
            console.log(result);
            if(result.length===0){
                res.status(404);
                res.json({name:"user does not Exists"});
            }
            else if(result[0].dataValues.password===req.body.password){
            console.log(result[0].dataValues);
            res.json(result[0].dataValues);
            }
            else{
                console.log(`password not matched`);
                // console.log(object);
                res.status(401);
                res.json({name:"user password is not correct"});
            }
            // res.redirect('/');
        })
        .catch(err => {
            console.log(err)
            res.send(err);
        });
})

User.sync({ force: false })
    .then(result => console.log(result))
    .catch(err => console.log(err));

// sequelize.authenticate()
// .then(con=>console.log(con))
// .catch(err=>console.log(err));
app.listen(3000, console.log(`listening on port 3000`));
