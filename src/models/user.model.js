import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"; //jwt is our bearer token  (JSON Web Token)
import bcrypt from "bcrypt"
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,//if u want to make any fieldd searchable in very optimized way then jst do its index true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String, //cloudinary url
        required:true,
        unique:true,
    },
    coverImage:{
        type:String,
    },
    watchHistory:[{
        type:Schema.Types.ObjectId,
        ref:"Video"
    }],
    password:{
        type:String,
        required:[true,'Password is required']
    },
    refreshToken:{
        type:String
    }
},{
    timestamps:true
})
// “Before saving the user document in the database, run this code first.”
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next(); //this will check if password is modified or not as i want to bcrypt only at time it is modified
    this.password=await bcrypt.hash(this.password,10) //10 is how many rounds should be run to bcrypt the password
    next() //“Okay, continue and save the document now.”
}) //prehook is method to run before jst doing some particular event
//er dont use arrow function in this bcz as we know in arrow function we cant use this keyword bt in this we required and allso
// we use async as it may takes time



userSchema.methods.isPasswordCorrect= async function(password)  //userSchema.methods lets you add custom methods to a user document
// custom methods are basically functions that you attach to your schema/model.
{
     return await bcrypt.compare(password,this.password)
}




// An access token is a JWT token used for authentication.

// It is usually sent to the client after login.

// Then the client uses it to access protected routes like:

// profile page
// dashboard
// edit account
// private API endpoints
userSchema.methods.generateAccessToken=function()
{


    // jwt.sign(payload, secretKey, options)
    // jwt.sign() is a function from the jsonwebtoken package used to create a JWT token.
    // When token is created:
    // jwt.sign(...)

    // the secret key is used to create a unique signature.

    // Later when user sends the token back:

    // jwt.verify(token, secret)

    // Node checks:

    // “Was this token really created by my server?”

    // using the same secret.
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function()
{
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model("User",userSchema)