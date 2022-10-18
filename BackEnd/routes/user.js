const express=require('express');
const router=express.Router();
const userControllers=require('../controllers/user');
const expenseControllers=require('../controllers/expense');

router.post('/signup',userControllers.signupUser);
router.post('/login',userControllers.loginUser);
router.post('/addExpense',expenseControllers.addExpense);

module.exports=router;