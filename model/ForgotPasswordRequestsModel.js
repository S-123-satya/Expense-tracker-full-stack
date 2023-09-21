const { UUID } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const forgotUserSchema = new Schema({
        uuid:{
        type:UUID,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true,
    } ,
});

const ForgotUser = mongoose.model('ForgotUser', forgotUserSchema);
module.exports = ForgotUser;
// const sequelize= require('./../util/db');
// const {DataTypes} = require('sequelize');

// const ForgotUser=sequelize.define('forgotuser',{
//     uuid:{
//         type:DataTypes.STRING,
//         allowNull:false
//     },
//     isActive:{
//         type:DataTypes.BOOLEAN,
//         allowNull:false
//     }
// })

// module.exports=ForgotUser;