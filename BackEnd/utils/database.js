const sequelize=require('sequelize');

module.exports=new sequelize('expense-tracker','root','root',{
    dialect: 'mysql',
    host:'localhost'
})