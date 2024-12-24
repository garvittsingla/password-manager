const mongoose = require("mongoose")

async function connectDb(){
  try{
   const conn = await mongoose.connect(process.env.MONGO_URL)

   console.log("Mongo DB connected")
  }  catch(err){
    console.log(err)
  }
}
module.exports= connectDb