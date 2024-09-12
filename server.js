const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const productRoutes = require('./routes/productRoutes.js')
const userRoutes = require("./routes/userRoutes.js")
const orderRoutes = require('./routes/orderRoutes.js')
const categoryRoutes = require('./routes/categoryRoutes.js')
const cartRoutes = require('./routes/cartRoutes.js')
const paymentRoutes= require('./routes/paymentRoutes.js')
const adminRoutes = require('./routes/adminRoutes.js')
 

dotenv.config()

const app = express()

app.use(express.json())

app.use('/api/user/products', productRoutes)
app.use('/api/user/users', userRoutes)
app.use('/api/user/orders',orderRoutes)
app.use('/api/user/categories',categoryRoutes )
app.use('/api/user/carts',cartRoutes)
app.use('/api/user/payments',paymentRoutes)
app.use('api/admin',adminRoutes)
 

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));
 
app.listen(3000, (req, res) => {
    console.log('server is listening on port 3000')
})