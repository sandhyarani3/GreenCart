import Product from "../models/Product.js";
import cloudinary from "../configs/cloudinary.js";

//add product :/api/product/add
export const addProduct=async(req,res)=>{
   try {
    let productData=JSON.parse(req.body.productData);
    const images=req.files

    let imagesUrl=await Promise.all(
        images.map(async(item)=>{
            let result=await cloudinary.uploader.upload(item.path,
                {resource_type:'image'}
            );
            return result.secure_url
        })
    )
    await Product.create({...productData,image:imagesUrl});

    return res.json({success:true,message:"Product Added"});
   } catch (error) {
      console.log(error.message);
      return res.json({success:false,message:error.message})
   }
}

//get product :/api/product/list
export const productList=async(req,res)=>{
 try {
    const products=await Product.find({})//empty object returns all products
    res.json({success:true,products})
 } catch (error) {
    console.log(error.message);
      return res.json({success:false,message:error.message})
 }
}

//add single product :/api/product/id
export const productById=async(req,res)=>{
  try {
    const {id} =req.body;
    const product=await Product.findById(id);
    res.json({success:true,product})
  } catch (error) {
    console.log(error.message);
      return res.json({success:false,message:error.message})
  }
}

//change product instock :/api/product/stock
export const changeStock=async(req,res)=>{
 try {
    const {id,instock}=req.body;
    await Product.findByIdAndUpdate(id,{instock})
    res.json({success:true,message:"Stock Updated"});
 } catch (error) {
    console.log(error.message);
      return res.json({success:false,message:error.message})
 }
}