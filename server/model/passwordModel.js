const mongoose = require("mongoose")

const passwordschema =  mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    siteurl:{
        type:String,
        required:true
    },
    singlepassword:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Password",passwordschema)