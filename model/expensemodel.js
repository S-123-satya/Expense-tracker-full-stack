const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');


const Expense = sequelize.define('Expense', {
  // Model attributes are defined here
  expenseInput: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  descriptionInput: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryInput: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
}, {
  // Other model options go here
});

module.exports=Expense;

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true