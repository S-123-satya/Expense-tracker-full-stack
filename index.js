const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./model/dbmodel');
const Expense = require('./model/expensemodel');
const sequelize = require('./util/db');
const signupRoutes = require('./routes/signupRoutes'); 
const expenseRoutes = require('./routes/expenseRoutes'); 
const loginRoutes = require('./routes/loginRoutes'); 

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json()); //we are using express.json which uses body-parser in background in order to parse only json request from body
app.use(express.static(path.join(__dirname, 'public')))

app.use('/signup',signupRoutes);
app.use('/login',loginRoutes);
app.use('/expense',expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync({ force: false })
    .then(result => console.log(`connected to data base`))
    .catch(err => console.log(err));

// sequelize.authenticate()
// .then(con=>console.log(con))
// .catch(err=>console.log(err));
app.listen(port, console.log(`listening on port 3000`));
