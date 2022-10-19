const Expense=require('../models/expense');

exports.addExpense=async(req,res,next)=>{
    try{
        console.log('body.............',req.body);
        console.log('hi...........',req.user);
        const expenseRes=await req.user.createExpense(req.body);
        res.status(201).json(expenseRes);
    }
    catch(err){
        res.status(500).json(err);
    }
}
exports.getExpenses=async(req,res,next)=>{
    try{
        const expensesRes=await req.user.getExpenses();
        res.json(expensesRes);
    }
    catch(err){
        res.status(500).json(err);
    }
}

exports.deleteExpense=async(req,res,next)=>{
    try{
        console.log('req.params:', req.params);
        const expenseRes=await Expense.destroy({where:{id:req.params.expenseId}});
        res.status(204).json({ success: true, message: "Deleted Successfuly"});
    }
    catch(err){
        res.status(500).json(err);
    }
}