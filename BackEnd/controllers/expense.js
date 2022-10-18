exports.addExpense=async(req,res,next)=>{
    try{
        console.log('body.............',req.body);
        console.log('hi...........',req.user);
        const expenseRes=await req.user.createExpense(req.body);
        res.json(expenseRes);
    }
    catch(err){
        res.status(500).json(err);
    }
}