const User=require('../models/user');

exports.postUser=(req,res,next)=>{
    // console.log("hi.........",req.body);
    User.create(req.body)
        .then(result=>res.json(result))
        .catch(err=>res.json(err));
}
