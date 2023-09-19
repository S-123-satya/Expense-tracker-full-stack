const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

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
                    console.log(`19`);
                    console.log(result._id);
                    const user = {
                        userId: result._id,
                        is_premium:result.is_premium
                    }
                    console.log(user);
                    console.log(`25`);
                    jwt.sign({ user }, secretKey,  (err, token) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log('successful encry');
                            res.json({ 
                                message: "User login Succesfully",
                                token,
                                name: result.name,
                                is_premium:result.is_premium});
                        }
                        return;
                    })

                })
                .catch(err => {
                    console.log(err)
                    res.send(err);
                });
        })
        .catch(err=>{
            console.log(err);
            return res.end();
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