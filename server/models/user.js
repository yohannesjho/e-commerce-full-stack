const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{type:String,required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true,},
    isAdmin:{type:Boolean, default:false},
    shippingAddress:{street:String, city:String, postalCode:String, country:String},
    orders:[{type:mongoose.Schema.Types.ObjectId, ref:"Order"}]
},{timeStamps:true})

module.exports = mongoose.model("User",userSchema)