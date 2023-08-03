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
            Order.create({ order_id: order.id, payment_status: "PENDING", UserId: 1 })
            return res.status(201).json({ message: "succesful", order });
        }
    });
}

module.exports.postPremiumController = async(req, res) => {
    const t = await sequelize.transaction();
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
                    order_id: req.body.razorpay_order_id,
                    
                },transaction:t
            } /* where criteria */
        )
            .then(async result =>{
                 console.log(result)
                await t.commit()
            })
            .catch(async err => {
                console.log(err)
               await t.rollback()
            })
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
                            id: data.user.userId,
                            
                        },transaction:t
                    })
                    .then(result => {
                        console.log(`after update`);
                        console.log(result);
                        // generate jwt token with id and isPremirum
                        User.findOne({
                            where: {
                                id: data.user.userId,
                            }
                        })
                            .then(async result1 => {
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
                                await t.commit();
                            })
                            .catch(async err =>{
                                console.log(err);
                                await t.rollback();
                            
                            } )
                        // res.json({ message: "Premium User" });
                    })
                    .catch(async err =>{
                        console.log(err);
                        await t.rollback();
                    
                    } )
            }
        })
    }
    else
        return res.json({ success: false, message: "Payment verification failed" })

}
module.exports.getDashboardController = async (req, res) => {
    const user = await User.findAll({
        include:[
            {
                model:Expense,
                attributes:[]
            }
        ],
        attributes:['name',[sequelize.fn('sum',sequelize.col(`expenses.expenseInput`)),'totalcost']],
        group:['id'],
        order:[['totalcost','DESC']]
    });
    // const expenses = await Expense.findAll({
    //     attributes:['UserId',[Sequelize.fn('sum',Sequelize.col(`expenseInput`)),'totalcost']],
    //     group:'UserId',
    // });
    // console.log(`expenses`);
    // console.log(expenses);
    // console.log(data);
    // console.log(amount);
    // const d = data.sort((a, b) => b.expense - a.expense);
    // console.log(data);
    // console.log(d);
    console.log(user);
    res.json({ data: user });
}