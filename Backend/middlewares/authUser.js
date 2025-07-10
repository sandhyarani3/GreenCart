import jwt from 'jsonwebtoken'
export const authUser=async(req,res,next)=>{
    console.log("Cookies: ", req.cookies);
    const {token}=req.cookies;
    
    if(!token){
        return res.json({success:false,message:"Not Authorized"});
    }
    try {
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.body = req.body || {};
            req.body.userId=tokenDecode.id;
            next();
        }
        else{
            return res.json({success:false,message:"Not Authorized"});
        }
        
    } catch (error) {
        console.log(error.message);
        return res.json({success:false,message:error.message});
    }
}