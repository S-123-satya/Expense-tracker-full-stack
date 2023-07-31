const Razorpay = require('razorpay');
const Order = require('./../model/orderModel');
const User = require('./../model/userModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Expense = require('../model/expensemodel');
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
            Order.create({ order_id: order.id, payment_status: "PENDING", UserId: 1 })
            return res.status(201).json({ message: "succesful", order });
        }
    });
}

module.exports.postPremiumController = (req, res) => {
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
        Order.update(
            {
                payment_id: req.body.razorpay_payment_id,
                payment_sign: req.body.razorpay_signature,
                payment_status: "SUCCESS"
            } /* set attributes' value */,
            {
                where: {
                    order_id: req.body.razorpay_order_id
                }
            } /* where criteria */
        )
            .then(result => console.log(result))
            .catch(err => console.log(err))
        jwt.verify(req.token, secretKey, (err, data) => {
            if (err) {
                console.log(err);
                res.json({
                    message: 'invalid token'
                })
            }
            else {
                console.log(data);
                console.log(data.UserId);
                User.update({
                    is_premium: true
                },
                    {
                        where: {
                            id: data.user.userId
                        }
                    })
                    .then(result => {
                        console.log(`after update`);
                        console.log(result);
                        // generate jwt token with id and isPremirum
                        User.findOne({
                            where: {
                                id: data.user.userId
                            }
                        })
                            .then(result1 => {
                                console.log(`after fetch`);
                                console.log(result1);
                                console.log(result1.dataValues);
                                const user = {
                                    userId: result1.dataValues.id,
                                    is_premium: result1.dataValues.is_premium
                                }
                                jwt.sign({ user }, secretKey, (err, token) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        return res.json({ name: result1.dataValues.name, token, is_premium: true })
                                    }
                                })
                            })
                        // res.json({ message: "Premium User" });
                    })
                    .catch(err => console.log(err));
            }
        })
    }
    else
        return res.json({ success: false, message: "Payment verification failed" })

}
module.exports.getDashboardController = async (req, res) => {
    const expenses = await Expense.findAll();
    const user = await User.findAll();
    // user.map()
    console.log(user);
    const amount = {};
    expenses.forEach(expense => {
        if (amount[expense.UserId]) {
            amount[expense.UserId] += expense.expenseInput;
        }
        else
            amount[expense.UserId] = expense.expenseInput;
    })
    const data = [];
    user.forEach(obj => {
        data.push({ name: obj.name, expense: amount[obj.id] || 0 })
    });
    console.log(data);
    console.log(amount);
    const d = data.sort((a, b) => b.expense - a.expense);
    console.log(data);
    console.log(d);
    res.json({ data: d });
}