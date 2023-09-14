const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
// const helmet = require('helmet');

const User = require('./model/userModel');
// const Expense = require('./model/expensemodel');
// const Order = require('./model/orderModel');
// const ForgotUser = require('./model/ForgotPasswordRequestsModel');
const mongodb = require('./util/db');
const signupRoutes = require('./routes/signupRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const loginRoutes = require('./routes/loginRoutes');
const premiumRoutes = require('./routes/premiumRoutes');
const forgetRoutes = require('./routes/forgetRoutes');
const userRoutes = require('./routes/userRoutes');
const updateRoutes=require('./routes/updateRoutes');

const app = express();

//secret key for jwt
const secretKey = "secretKey";

//port number where our server runs
const port = 3000;
app.use(cors());
// app.use(helmet());

//we are using express.json which uses body-parser in background in order to parse only json request from body
app.use(express.json());

// Sending static html file which are downloaded by our front-end users
app.use(express.static(path.join(__dirname, 'public')))

// handling request from users
// app.use('/signup', signupRoutes);
// app.use('/login', loginRoutes);
// app.use('/expense', expenseRoutes);
// app.use('/premium', premiumRoutes);
// app.use('/password',forgetRoutes);
// app.use('/user',userRoutes);
// app.post('/updatepassword',updateRoutes)

// User.hasMany(ForgotUser);
// ForgotUser.belongsTo(User);

// User.hasMany(Expense);
// Expense.belongsTo(User);

// User.hasMany(Order);
// Order.belongsTo(User);
// sequelize.sync({ force: false })
//     .then(result => console.log(`connected to data base`))
//     .catch(err => console.log(err));

// sequelize.authenticate()
// .then(con=>console.log(con))
// .catch(err=>console.log(err));

const obj=new User({
    name:'satya',
    email:'satya1@gmail.com',
    password:'12345'
})
// obj.save()
// .then(result=>console.log(result))
// .catch(err=>console.log(err))
const showAll=async ()=>{
    const result=await User.find()
    console.log(result);
}
showAll()

mongodb()
.then(respose=>{
    console.log(`database is connected to mongodb`);
    app.listen(port, console.log(`listening on port 3000`));
})
.catch(err=>console.log(err))