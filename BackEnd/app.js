const cors=require('cors');
const express=require('express');
const bodyParser=require('body-parser')
const sequelize=require('./utils/database');
 //routes import
const userRoutes=require('./routes/user');
 //models import
const User=require('./models/user');
const Expense=require('./models/expense');

//middlewares
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
 //routes middleware
app.use('/user',userRoutes);

//associations
User.hasMany(Expense);
Expense.belongsTo(User);

//Sync Models with DB then listen to requests
sequelize
    // .sync({force:true})
    .sync()
    .then(result=>app.listen(3000))
    .catch(err=>console.log(err));

