import mongoose from "mongoose";

const connectDB=async()=>{
    try {
         
        console.log("Connecting to MongoDB...");
        // Connect to MongoDB
        

        // Log when successfully connected
        mongoose.connection.on('connected',()=>{
            console.log("Database connected");
        });
        await mongoose.connect(process.env.MONGODB_URI)
        
    } catch (error) {
        console.error(error.message);
    }
}
export default connectDB;