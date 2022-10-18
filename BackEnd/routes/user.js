const express=require('express');
const router=express.Router();
const userControllers=require('../controllers/user');

router.post('/user/signup',userControllers.postUser);

module.exports=router;