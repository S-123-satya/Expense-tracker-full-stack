const Razorpay = require('razorpay');
// create an instance of razorpay in which we pass keyid and secertkey
// 2. then create an options object
// ----> amount and  currency important hota hai --> because frontend pe bharosh nhi kar sakte hai ham wo koi v data send kar sakta hai
// 3. we create order for that instance and pass options and a callback function
// 4. callback  funtion takes 2 args 1st one is err and 2nd one is order 
//   ----> if not any err occur then we send order as a response
module.exports.postPremiumController=(req,res)=>{
    let instance= new Razorpay({key_id:process.env.KEY_ID,key_secret:process.env.KEY_SECRET});
    let options={
        amount:2500,
        currency:"INR",
    }
    instance.orders.create(options,(err,order)=>{
        if(err){
            return res.status(500).json({message:"error occur"})
        }
        else{
            return res.status(201).json({message:"succesful",order});
        }
    });
}