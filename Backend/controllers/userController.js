//register user

import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
//api/user/register
export const register=async(req,res)=>{
  try {
    const {name,email,password}=req.body;

    if(!name || !email || !password){
        return res.json({success:false,message:"Missing Details"});
    }

    const existingUser=await User.findOne({email})
    if(existingUser)return res.json({success:false,message:"User already exists"});

    const hashedpassword=await bcrypt.hash(password,10);

    const user= await User.create({name,email,password:hashedpassword});
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.cookie('token',token,{
        httpOnly:true, //prevent js to access cookie
        secure:process.env.NODE_ENV==='production', //use secure cookie in production
        sameSite:process.env.NODE_ENV==='production'?'none':'strict',
        maxAge:7*24*60*60*1000,//cookie expiration time
    })
    // console.log(user)
    return res.json({success:true,user:{email:user.email,name:user.name}});

  } catch (error) {
    console.log(error.message)
    return res.json({success:false,message:error.message});
  }
}


//login
//api/user/login

export const login=async(req,res)=>{
  try {
    const {email,password}=req.body;
    if(!email || !password)return res.json({success:false,message:'Missing Details'});

    
    const user =await User.findOne({email});
    if(!user)return res.json({success:false,message:"User doesn't exists"});

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch)return res.json({success:false,message:'Invalid password...please try again!'});

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.cookie('token',token,{
        httpOnly:true, //prevent js to access cookie
        secure:process.env.NODE_ENV==='production', //use secure cookie in production
        sameSite:process.env.NODE_ENV==='production'?'none':'strict',
        maxAge:7*24*60*60*1000,//cookie expiration time
    })
    // console.log(user)
    return res.json({success:true,user:{email:user.email,name:user.name}});

  } catch (error) {
    console.log(error.message)
    return res.json({success:false,message:error.message});
  }
}

//check Auth /api/user/is-auth
export const isAuth=async(req,res)=>{
  try {
    const {userId}=req.body;
    const user =await User.findById(userId).select("-password");//select all data except password
    return res.json({success:true,user})
  } catch (error) {
    console.log(error.message)
    return res.json({success:false,message:error.message});
  }
}

//logout /api/user/logout
export const logout=async(req,res)=>{
  try {
    res.clearCookie('token',{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production', 
      sameSite:process.env.NODE_ENV==='production'?'none':'strict',
    });
    return res.json({success:true,message:"Logged Out"});
  } catch (error) {
    console.log(error.message)
    return res.json({success:false,message:error.message});
  }
}