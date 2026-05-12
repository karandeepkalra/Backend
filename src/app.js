import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()

// CORS configuration (using cors) controls which 
// frontend is allowed to talk to your backend;
// origin: process.env.CORS_ORIGIN restricts access to a specific domain, 
// and credentials: true allows cookies and auth data to be sent, 
// which is important when your React app communicates with the server securely.
app.use(cors({
    origin:process.env.CORS_ORIGIN, //Which which origin to allow
    credentials:true
}))


//to set configuration
// express.json({ limit: "16kb" }) allows your server to read JSON data sent
// from the frontend (like form submissions or API calls), converting it into req.body; 
// the size limit prevents very large payloads from overloading your server.


// Convert incoming JSON data into usable JS object

// Example:

// Frontend sends:

// { "name": "Karan" }

// Without this ❌ → req.body = undefined
// With this ✅ → req.body = { name: "Karan" }

// limit: "16kb"

// Prevents very large request bodies (security + performance)
app.use(express.json({limit:"16kb"}))



// express.urlencoded({ extended: true, limit: "16kb" }) is used to handle data coming from HTML forms (like name=karan&age=21), 
// and with extended: true, it can also handle nested or complex data structures efficiently.
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))

// express.static("public") tells the server to serve static files (like images, CSS, or JS) directly from the public folder,
//  so anything inside it can be accessed via a URL without writing extra routes.
app.use(express.static("public"))

// cookieParser() (from cookie-parser) reads cookies sent by the browser and makes them available in req.cookies, 
// which is useful for handling login sessions, authentication tokens, and user tracking.
app.use(cookieParser())



//routes import
import userRouter from "./routes/user.routes.js"

//routes declaration
app.use("/api/v1/users",userRouter)
// heeps:localhost:8000/api/v1/users/register


export {app}