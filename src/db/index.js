import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// MONGODB_URI = server + login details
// DB_NAME = which database to use inside server

const connectDB = async()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB Connected !! DB Host ${connectionInstance.connection.host}`);
    }
    catch(error)
    {
        console.log("MongoDB connection error",error);
        process.exit(1) //This is the reference to exit the process
    }
}


export default connectDB