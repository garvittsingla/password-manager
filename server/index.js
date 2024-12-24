const express = require("express")
const dotenv = require("dotenv").config()
const passwordRoutes = require('./routes/passwordRoutes')
const userRoutes = require('./routes/userRoutes')
const port = process.env.PORT 
const app = express()
const connectDb = require("./config/db")
const cors = require("cors")


connectDb()
app.use(cors())
app.use(express.json())
app.use("/api/passwords",passwordRoutes)
app.use("/api/users",userRoutes)




app.listen(port)