import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import connectDB from './configs/db.js';
import 'dotenv/config'
import { userRouter } from './routes/userRoutes.js';
import { sellerRouter } from './routes/sellerRoutes.js';
import { productRouter } from './routes/productRoutes.js';
import { cartRouter } from './routes/cartRoute.js';
import { addressRouter } from './routes/addressRoutes.js';
import { orderRouter } from './routes/orderRoutes.js';
import { stripeWebhooks } from './controllers/orderController.js';

const app=express();
const port=process.env.PORT || 4000

//connecting db
await connectDB();
// await connectCloudinary();
app.post('/stripe',express.raw({type:'application/json'}),stripeWebhooks)

const allowedOrigins=['http://localhost:5173']//only these can access our backend server

//Middleware configuration
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:allowedOrigins,credentials:true}))
//origin 

app.get('/',(req,res)=>{
    res.send('API is working')
});
 
app.use('/api/user',userRouter);
app.use('/api/seller',sellerRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/address',addressRouter);
app.use('/api/order',orderRouter);
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})

process.on('unhandledRejection', (err) => {
    console.error("Unhandled Rejection:", err.message);
  });
  