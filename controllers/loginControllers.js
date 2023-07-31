const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/userModel');

const secretKey = "secretKey";

module.exports.postLoginController = (req, res) => {
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
                    if (resu === true) {
                        console.log(result[0].dataValues);
                        // generating token when user is login with post request 
                        const user = {
                            userId: result[0].dataValues.id,
                        is_premium:result[0].dataValues.is_premium
                        }
                        jwt.sign({ user }, secretKey, (err, token) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.json({ name:result[0].dataValues.name,token,is_premium:result[0].dataValues.is_premium })
                            }
                        })
                        // res.json({ name: result[0].dataValues.name, userId: result[0].dataValues.id, email: result[0].dataValues.email });
                    }
                    else {
                        console.log(`password not matched`);
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
// [satya ,ailfhuavbilafbibfibfbf]
// const validateToken = (req, res, next) => {
//     const bearerHeader = req.headers['authorization'];
//     if (typeof bearerHeader !== "undefined") {
//         const bearer = bearerHeader.split(' ');
//         const token = bearer[1];
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