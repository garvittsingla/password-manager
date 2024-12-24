const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Password = require("../model/passwordModel");
const User= require("../model/userModel");
const protect = require("../middleware/authMiddleware")





router.get("/", protect,asyncHandler(async (req, res) => {
    const passwords = await Password.find({user : req.user.id});
    res.status(200).json({ passwords });
}));

router.post("/",protect, asyncHandler(async (req, res) => {
    const password = await Password.create({
        siteurl: req.body.siteurl,
        singlepassword: req.body.singlepassword,
        user:req.user.id
    });
    console.log(hash)
    res.status(200).json(password);
}));

router.put("/:id",protect, asyncHandler(async (req, res) => {
    const singlepassword = await Password.findById(req.params.id)
    if (!singlepassword){
       return res.status(411).json({message:"Password not found"})


    }

    const user = await User.findById(req.user.id)
    if(!user){
       return res.status(411).json({msf:"user not found"})
    }
    const updatedpassword = await Password.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json(updatedpassword)
}));

router.delete("/:id",protect, asyncHandler(async (req, res) => {
    const singlepassword = await Password.findById(req.params.id)
    if (!singlepassword){
        res.status(400).json({message:"Pssword not found"})
    }
    await Password.deleteOne({_id:req.params.id})
    res.status(200).json(req.params.url)
}));

module.exports = router;