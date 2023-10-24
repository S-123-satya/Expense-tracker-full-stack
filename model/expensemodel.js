const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new Schema({
  expenseInput: {
    type: Number,
    required: true,
  },
  descriptionInput: {
    type: String,
    required: true,
  },
  categoryInput: {
    type: String,
    required: true,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
