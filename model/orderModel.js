const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  order_id: {
    type: String,
    required:true
  },
  payment_id: {
    type: String,
  },
  payment_sign: {
    type: String,
  },
  payment_status:String,
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
// const { DataTypes } = require('sequelize');
// const sequelize = require('../util/db');


// const Order = sequelize.define('order', {
//   // Model attributes are defined here
//   order_id: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   payment_id: {
//     type: DataTypes.STRING,
//   },
//   payment_sign: {
//     type: DataTypes.STRING,
//   },
//   payment_status:DataTypes.STRING,
  
// }, {
//   // Other model options go here
// });

// module.exports=Order;