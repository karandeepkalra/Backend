import connectDB from "./db/index.js";
import dotenv from "dotenv"
dotenv.config({   //load env file as soon as possible
    path:'./.env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log("serverr is running")
    })
})
.catch((error)=>{
    console.log("MongoDB connection failed",error)
})