const jwt=require('jsonwebtoken');

const auth=(req,res,next)=>{
    try {
        const token= req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_KEY || "debugkey");
        req.user=decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401);
        res.json({messagge:'Auth failed'});
    }
}

module.exports=auth;