import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";
dotenv.config({   //load env file as soon as possible
    path:'./.env'
})
// const app=express()
connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log("serverr is running",process.env.PORT)
    })
})
.catch((error)=>{
    console.log("MongoDB connection failed",error)
})