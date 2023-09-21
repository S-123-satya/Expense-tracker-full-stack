const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  is_premium: {
    type: Boolean,
    defaultValue: false
  },
  orders:{
    type:mongoose.ObjectId,
    ref:'Order'
  },
  total_expenses: {
    type: Number,
    defaultValue: 0
  },
  expenses:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Expense"
  }],
  forgetpasswords:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"ForgotUser"
  }],
  orders:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Order"
  }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
// const { DataTypes } = require('sequelize');
// const sequelize = require('../util/db');


// const User = sequelize.define('User', {
//   // Model attributes are defined here
//   name: {
//     type: DataTypes.STRING,
//     allowNull:false
//     //   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   is_premium: {
//     type:DataTypes.BOOLEAN,
//     defaultValue:false
//   },
//     total_expenses:{
//       type:DataTypes.BIGINT,
//       defaultValue:0
//   },
// }, {
//   // Other model options go here
// });

// module.exports = User;

// // `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true