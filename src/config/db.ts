import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const CONNECTION_URL:string = process.env.DB_ENDPOINT!;

const connectDB = async () => {
    try {
       await mongoose.connect(CONNECTION_URL)
       console.log("Database is connected")
    } catch (error:any) {
       return error.message;
    }
    
}

export default connectDB;