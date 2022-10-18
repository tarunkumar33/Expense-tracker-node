const cors=require('cors');
const express=require('express');
const bodyParser=require('body-parser')
const sequelize=require('./utils/database');
 //routes import
const userRoutes=require('./routes/user');
 //models import

//middlewares
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
 //routes middleware
app.use('/user',userRoutes);

//associations

//Sync Models with DB then listen to requests
sequelize
    // .sync({force:true})
    .sync()
    .then(result=>app.listen(3000))
    .catch(err=>console.log(err));

