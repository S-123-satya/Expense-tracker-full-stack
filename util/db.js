
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('expense-full-stack', 'root', 'Satya0*123', {
    host: 'localhost',
    dialect: 'mysql' /* one of  | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

module.exports=sequelize;