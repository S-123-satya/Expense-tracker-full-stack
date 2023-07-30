const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv').config();

const User = require('./model/userModel');
const Expense = require('./model/expensemodel');
const sequelize = require('./util/db');
const signupRoutes = require('./routes/signupRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const loginRoutes = require('./routes/loginRoutes');
const premiumRoutes = require('./routes/premiumRoutes');
const Order = require('./model/orderModel');

const app = express();

//secret key for jwt
const secretKey = "secretKey";

//port number where our server runs
const port = 3000;

app.use(cors());

//we are using express.json which uses body-parser in background in order to parse only json request from body
app.use(express.json());

// Sending static html file which are downloaded by our front-end users
app.use(express.static(path.join(__dirname, 'public')))

// handling request from users
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/expense', expenseRoutes);
app.use('/premium', premiumRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);
sequelize.sync({ force: false })
    .then(result => console.log(`connected to data base`))
    .catch(err => console.log(err));

// sequelize.authenticate()
// .then(con=>console.log(con))
// .catch(err=>console.log(err));
app.listen(port, console.log(`listening on port 3000`));
