const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/userModel');

module.exports.postLoginController = async (req, res) => {
    try {
        console.log(`in login post routes controller`);
        const newUser = await User.findOne({ email: req.body.email })
        const user={
            userId:newUser._id,
            is_premium:newUser.is_premium
        }
        if (newUser) {
            const checkPassword = await bcrypt.compare(req.body.password, newUser.password)
            console.log(`20`);
            if (checkPassword) {
                jwt.sign({ user }, process.env.SECRET_TOKEN_KEY, (err, token) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json({
                            message: "User login Succesfully", 
                            name: newUser.name,
                            token, 
                            is_premium: newUser.is_premium,
                            status:201,
                        })
                    }
                })
            }
            else {
                console.log(`password not matched`);
                res.status(401);
                res.json({ message: "user password is not correct", });
            }
        }
        else{
            res.json({message:'Invalid email id'})
        }
    }
    catch (error) {
        console.log(error);
        res.send({message:error.message});
    }

};

//     where: {
//         email: req.body.email
//     }
// })
//     .then(result => {
//         if (result.length === 0) {
//             res.status(404);
//             res.json({ name: "user does not Exists" });
//         }
//         else{
//         bcrypt.compare(req.body.password, result[0].dataValues.password)
//             .then(function (resu) {
//                 if (resu === true) {
//                     console.log(result[0].dataValues);
//                     // generating token when user is login with post request
//                     const user = {
//                         userId: result[0].dataValues.id,
//                     is_premium:result[0].dataValues.is_premium
//                     }
//                     jwt.sign({ user }, secretKey, (err, token) => {
//                         if (err) {
//                             console.log(err);
//                         }
//                         else {
//                             res.json({ name:result[0].dataValues.name,token,is_premium:result[0].dataValues.is_premium })
//                         }
//                     })
//                     // res.json({ name: result[0].dataValues.name, userId: result[0].dataValues.id, email: result[0].dataValues.email });
//                 }
//                 else {
//                     console.log(`password not matched`);
//                     res.status(401);
//                     res.json({ name: "user password is not correct" });
//                 }
//             });
//         }
//         console.log(`result`);
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err)
//         res.send(err);
//     });