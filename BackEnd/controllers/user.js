const User=require('../models/user');

function isStringInvalid(string){
    if(string==undefined || string.length===0){
        return true;
    }
    return false;
}
exports.postUser=async (req,res,next)=>{
    try{
        // console.log("hi.........",req.body);
        const {name,email,password}=req.body;
        if(isStringInvalid(name)||isStringInvalid(email)||isStringInvalid(password)){
            return res.status(400).json({err:"Bad parameters, something is missing"});
        }
        const result=await User.create(req.body);
        res.status(201).json(result);
    }
    catch(err){
        res.status(500).json(err);
    }
}
