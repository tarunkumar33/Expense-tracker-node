const cors=require('cors');
const express=require('express');
const bodyParser=require('body-parser')
const sequelize=require('./utils/database');
 //routes import
const userRoutes=require('./routes/user');
const purchaseRoutes=require('./routes/purchase');
const leaderboardRoutes=require('./routes/leaderboard');
const resetpasswordRoutes=require('./routes/resetpassword');
 //models import
const User=require('./models/user');
const Expense=require('./models/expense');
const Order=require('./models/order');
const Forgotpassword=require('./models/forgotpassword');

//middlewares
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
 //routes middleware
app.use('/user',userRoutes);
app.use('/purchase',purchaseRoutes);
app.use('/leaderboard',leaderboardRoutes);
app.use('/password',resetpasswordRoutes);

//associations
User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

//Sync Models with DB then listen to requests
sequelize
    // .sync({force:true})
    .sync()
    .then(result=>app.listen(3000))
    .catch(err=>console.log(err));

