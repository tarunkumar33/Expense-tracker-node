const Sequelize=require('sequelize');
const sequelize=require('../utils/database');

//create table
module.exports=sequelize.define('forgotpassword',{
    id:{
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    active:Sequelize.BOOLEAN,
    expiresBy:Sequelize.DATE
});