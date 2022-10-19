const jwt=require('jsonwebtoken');
const User=require('../models/user');

exports.authenticate=async (req,res,next)=>{
    try{
        console.log('Auth');
        const {id}=jwt.verify(req.headers.authorization,"asdffghjklhhgvmj");
        const userRes=await User.findByPk(id);
        req.user=userRes;
        next();
    }
    catch(err) {
        console.log(err);
        return res.status(401).json({success: false})
      }
}