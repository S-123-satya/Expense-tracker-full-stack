const bcrypt = require('bcrypt');
const User = require('../model/dbmodel');

module.exports.postSignUpController = (req, res) => {
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
                    res.json({message:"User login Succesfully",result:result});
                })
                .catch(err => {
                    console.log(err)
                    res.send(err);
                });
        });
};
