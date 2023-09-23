const ForgotUser = require("../model/ForgotPasswordRequestsModel");
const User = require("../model/userModel");
const bcrypt = require('bcrypt');
module.exports.updatePasswordControllers=async (req,res)=>{
    console.log(`update password 5`);
    console.log(req.body);
    const {password,uuid}=req.body;
    const arr=uuid.split('/');
    console.log(arr[arr.length-1]);
    const result=await ForgotUser.findOne(
            {
                uuid:arr[arr.length-1],
                isActive:true,
            }
        );
        console.log(`update in 15`);
    console.log(result);
    if(result!==null){
        const hash=await bcrypt.hash(req.body.password, 10)
        const resetresult=await User.findByIdAndUpdate(
            result.UserId,
            {
                $set: { password: hash },
            }
             
          );
        //   const updateforget=await ForgotUser.update({ isActive: false }, {
        //     where: {
        //         uuid:arr[arr.length-1],
        //       }
        //     }); 
        console.log(resetresult);
        // console.log(updateforget);
        res.json({message:'password reset'})
    }
    
    // res.json({message:"reset successful"});
}