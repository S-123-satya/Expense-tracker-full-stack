const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
    expenseInput: {
        type: BIGINT,
        required:true
    },
    descriptionInput: {
        type: String,
        required:true,
    },
    categoryInput: {
        type: String,
        required:true,
    },
    user_id:{
        type:mongoose.ObjectId,
        ref:"User"
      }
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
// const { DataTypes } = require('sequelize');
// const sequelize = require('../util/db');


// const Expense = sequelize.define('Expense', {
//   // Model attributes are defined here
//   expenseInput: {
//     type: DataTypes.BIGINT,
//     allowNull: false
//   },
//   descriptionInput: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   categoryInput: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
  
// }, {
//   // Other model options go here
// });

// module.exports=Expense;

// // `sequelize.define` also returns the model
// // console.log(User === sequelize.models.User); // true