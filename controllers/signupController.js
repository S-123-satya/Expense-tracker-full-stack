const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/dbmodel');

const secretKey = "secretKey";

module.exports.postSignUpController = (req, res) => {
    console.log(`req.body.name=${req.body.name}`);
    console.log(`req.body.email=${req.body.email}`);
    console.log(`req.body.password=${req.body.password}`);
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
        .then(function (hash) {
            // Store hash in your password DB.
            req.body.password = hash;
            User.create(req.body)
                .then(result => {
                    console.log(result);
                    console.log(result.dataValues.id);
                    const user = {
                        userId: result.dataValues.id,
                    }
                    jwt.sign({ user }, secretKey, { expiresIn: '1000s' }, (err, token) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.json({ message: "User login Succesfully",token, name: result.dataValues.name });
                        }
                    })

                })
                .catch(err => {
                    console.log(err)
                    res.send(err);
                });
        });
};

//api for token generation
// app.post('/jwt', (req, res) => {
//     const user = {
//         id: 1,
//         name: 'bhavya',
//         email: "bhavya@gmail.com",
//         password: 'smart'
//     }
//     jwt.sign({ user }, secretKey, { expiresIn: '1000s' }, (err, token) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.json({ token })
//         }
//     })
// })