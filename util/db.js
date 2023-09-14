const mongoose = require('mongoose');

const mongodb=async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
module.exports=mongodb;
// const {Sequelize} = require('sequelize');

// const sequelize = new Sequelize('expense-full-stack', 'root', 'Satya0*123', {
//     host: 'localhost',
//     dialect: 'mysql' /* one of  | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
//   });

// module.exports=sequelize;