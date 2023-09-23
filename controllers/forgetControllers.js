const Sib = require('sib-api-v3-sdk');
const path = require('path');
const { createTransport } = require('nodemailer');
const User = require('../model/userModel');
const ForgotUser = require('../model/ForgotPasswordRequestsModel');
const { v4: uuidv4 } = require('uuid');
var otp = 0; //no use this time


module.exports.postForgetController = async (req, res) => {
    try {


        const result = await User.findOne({
                email: req.body.email
        })
        console.log(result);
        const uuid = uuidv4();
        console.log(uuid);
        if (result !== null) {
            const obj = {
                UserId: result.id,
                isActive: true,
                uuid: uuid,
            }
            console.log(obj);
            const forgotResult = await ForgotUser.create(obj);
            console.log(forgotResult);
            const defaultClient = Sib.ApiClient.instance;

            const apiKey = defaultClient.authentications['api-key'];
            apiKey.apiKey = process.env.SMTP_KEY_ID;
            console.log(`forget 10`);
            console.log(process.env.SMTP_KEY_ID);

            const transporter = createTransport({
                host: "smtp-relay.sendinblue.com",
                port: 587,
                auth: {
                    user: "satyaprakash5056742@gmail.com",
                    pass: process.env.SMTP_KEY_ID,
                },
            });
            console.log(req.body.email);
            const mailOptions = {
                from: 'satyaprakash5056742@gmail.com',
                to: req.body.email,
                subject: `Your subject`,
                text: `Your reset link is - http://localhost:3000/password/resetpassword/${uuid}

        This is valid for 1 time only.`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.json({ message: "A reset link send to your email id" })
                }
            });

        }
        else {
            res.json({message:"Invalid email id",status:501});
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.postresetpasswordController = async(req, res) => {
    const uuid=req.params.uuid;
    console.log(uuid);   
    const result=await ForgotUser.findOne({
            uuid:uuid,//also check that user link is isActive or not
    })
    console.log(result);
    if(result!==null){
        res.sendFile(path.join(__dirname,'..','forget','forget.html'));
    }
}