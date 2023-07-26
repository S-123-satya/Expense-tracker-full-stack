const express = require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.json({message:'hello login routes'});
})

module.exports=router;