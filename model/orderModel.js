const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  order_id: {
    type: String,
    required: true,
  },
  payment_id: {
    type: String,
  },
  payment_sign: {
    type: String,
  },
  payment_status: String,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
