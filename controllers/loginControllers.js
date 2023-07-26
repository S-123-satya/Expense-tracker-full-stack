const bcrypt = require('bcrypt');
const User = require('../model/dbmodel');

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
                        res.json({ name: result[0].dataValues.name, userId: result[0].dataValues.id, email: result[0].dataValues.email });
                    }
                    else {
                        console.log(hash);
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