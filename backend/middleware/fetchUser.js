const jwt=require('jsonwebtoken');
const JWT_SECRET='THISISASECRET';

const fetchUser = (req,res,next)=>{
    const token=req.header('Auth-Token');
    if(!token){
        res.status(401).send({error:"Unauthorized Access"});
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send({error:"Unauthorized Access"});
    }
}

module.exports=fetchUser;