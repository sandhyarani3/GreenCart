import express from "express";
import { addProduct, changeStock, productById, productList } from "../controllers/productController.js";
import { upload } from "../configs/multer.js";
import { authSeller } from "../middlewares/authSeller.js";

export const productRouter=express.Router();

productRouter.post('/add',upload.array(["images"]),authSeller,addProduct);
productRouter.get('/list',productList);
productRouter.post('/id',productById);
productRouter.post('/stock',authSeller,changeStock)