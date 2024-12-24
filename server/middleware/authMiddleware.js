const jwt = require("jsonwebtoken")
const asyncHandelr = require("express-async-handler")
const User  = require("../model/userModel")


const protect = asyncHandelr(async (req,res,next)=>{
    let token 
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id)
            

            next()
        }catch(error){
            console.log(error)
            res.status(411).json({message:"Not authorized"})
        } 
        if (!token){
            res.status(411).json({message:"not authorized, no token"})
        }
    }
})

module.exports = protect