const User=require('../models/user');
const Expense=require('../models/expense');

exports.getUsers=async(req,res,next)=>{
    try{
        console.log('req:', req.user);
        if(req.user.premiumUser==null ||req.user.premiumUser===false){
            res.status(401).json({status:"fail",message:"User Is not a Premium Member"});
            return;
        }
        const userRes=await User.findAll({attributes:['id','name'],include:Expense});
        console.log('userRes:', userRes);
        res.json(userRes);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getUserExpenses=async(req,res,next)=>{
    try{
        console.log('req:', req.params);
        if(req.user.premiumUser==null ||req.user.premiumUser===false){
            res.status(401).json({status:"fail",message:"User Is not a Premium Member"});
            return;
        }
        const expensesRes=await Expense.findAll({where:{userId:req.params.userId}});
        console.log('expensesRes:', expensesRes)
        res.json(expensesRes);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}