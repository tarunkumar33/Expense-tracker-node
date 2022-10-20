const Sequelize=require('sequelize');
const sequelize=require('../utils/database');

//create table
module.exports=sequelize.define('order',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    paymentId:Sequelize.STRING,
    orderId:Sequelize.STRING,
    status:Sequelize.STRING
})