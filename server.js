const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const productRoutes = require('./routes/productRoutes.js')
const userRoutes = require("./routes/userRoutes.js")

dotenv.config()

const app = express()

app.use(express.json())

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

 

app.listen(3000,(req,res)=>{
    console.log('server is listening on port 3000')
})