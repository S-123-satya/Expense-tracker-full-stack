const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const secretKey = "secretKey";

module.exports.postSignUpController = async (req, res) => {
    try {
        console.log(`in post sing controller`);
        const checkUser = await User.findOne({ email: req.body.email })
        if (!checkUser) {
            const hash = await bcrypt.hash(req.body.password, 10)
            req.body.password = hash;
            const newUser = await User.create(req.body)
            const user = {
                userId: newUser._id,
                is_premium: false
            }
            jwt.sign({ user }, secretKey, (err, token) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('successful encry');
                    res.json({
                        message: "User login Succesfully",
                        token,
                        name: newUser.name,
                        is_premium: newUser.is_premium,
                        status:201
                    });
                }
            })
        }
        else {
            res.json({ message: 'User already exists' ,status:409 });
        }

    }
    catch (err) {
        console.log(err);
        res.send(err.message);
    };
};
