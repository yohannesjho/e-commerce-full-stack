const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description: {type:String,required:true},
    price:{type:Number, required:true},
    imgUrl:{type:String},
    category:{type:String},
    countInStock:{type:Number, default:0}
})

  
module.exports = mongoose.model("Product", productSchema)