const Razorpay = require('razorpay');
const Order = require('./../model/orderModel');
const User = require('./../model/userModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Expense = require('../model/expensemodel');
const sequelize = require('../util/db');
const secretKey = "secretKey";

// create an instance of razorpay in which we pass keyid and secertkey
// 2. then create an options object
// ----> amount and  currency important hota hai --> because frontend pe bharosh nhi kar sakte hai ham wo koi v data send kar sakta hai
// 3. we create order for that instance and pass options and a callback function
// 4. callback  funtion takes 2 args 1st one is err and 2nd one is order 
//   ----> if not any err occur then we send order as a response
module.exports.getPremiumController = (req, res) => {
    let instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET });
    let options = {
        amount: 2500,
        currency: "INR",
    }
    instance.orders.create(options, (err, order) => {
        if (err) {
            return res.status(500).json({ message: "error occur" })
        }
        else {
            Order.create({ order_id: order.id, payment_status: "PENDING", UserId: 1 }) //yaha UserId ko hard code kar diya hai mujhe yaha pe token se id extract kar ke yaha userid dalna padega
            return res.status(201).json({ message: "succesful", order });
        }
    });
}

module.exports.postPremiumController = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        console.log(req.body);
        // STEP 1: Receive Payment Data
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        // Pass yours key_secret here
        const key_secret = process.env.KEY_SECRET;

        // STEP 2: Verification & Send Response to User

        // Creating hmac object
        let hmac = crypto.createHmac('sha256', key_secret);

        // Passing the data to be hashed
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);

        // Creating the hmac in the required format
        const generated_signature = hmac.digest('hex');

        console.log(generated_signature);
        if (razorpay_signature === generated_signature) {
            const result = await Order.update(
                {
                    payment_id: req.body.razorpay_payment_id,
                    payment_sign: req.body.razorpay_signature,
                    payment_status: "SUCCESS"
                } /* set attributes' value */,
                {
                    where: {
                        order_id: req.body.razorpay_order_id,

                    }, transaction: t
                } /* where criteria */
            )
            jwt.verify(req.token, secretKey, async (err, data) => {
                if (err) {
                    console.log(err);
                    res.json({
                        message: 'invalid token'
                    })
                }
                else {
                    console.log(data);
                    console.log(data.UserId);
                    const user_update = await User.update({
                        is_premium: true
                    },
                        {
                            where: {
                                id: data.user.userId,

                            }, transaction: t
                        })
                    console.log(user_update);
                    // generate jwt token with id and isPremirum
                    const user_find = await User.findOne({
                        where: {
                            id: data.user.userId,
                        }
                    })
                    console.log(`after fetch`);

                    const user = {
                        userId: user_find.dataValues.id,
                        is_premium: user_find.dataValues.is_premium
                    }
                    jwt.sign({ user }, secretKey, (err, token) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            return res.json({ name: user_find.dataValues.name, token, is_premium: true })
                        }
                    })
                    await t.commit();
                }
            })
        }
        // paymenet fail in Order table
    } catch (error) {
        console.log(error);
        await t.rollback();
        return res.json({ success: false, message: "Payment verification failed" })
    }

}
module.exports.getDashboardController = async (req, res) => {
    const user = await User.findAll({
        include: [
            {
                model: Expense,
                attributes: []
            }
        ],
        attributes: ['name', [sequelize.fn('sum', sequelize.col(`expenses.expenseInput`)), 'totalcost']],
        group: ['id'],
        order: [['totalcost', 'DESC']]
    });
    console.log(user);
    res.json({ data: user });
}