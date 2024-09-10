 

 

const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            name:String,
            quantity:Number,
            price:Number
        }
        
    ],
    shippingAddress:{
        street:String,
        city:String,
        postalCode:String,
        country:String
    },
    paymentMethod:{type:String, required:true},
    paymentStatus:{type:String, default:"pending"},
    totalPrice:{type:Number, required:true},
    isDelivered:{type:Boolean, default:false},
    deliveredAt:{type:Date}

},{timestamp:true})

module.exports  = mongoose.model('Order',orderSchema )