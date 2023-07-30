const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');


const User = sequelize.define('User', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_premium: {
    type:DataTypes.BOOLEAN,
    defaultValue:false
  }
}, {
  // Other model options go here
});

module.exports = User;

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true