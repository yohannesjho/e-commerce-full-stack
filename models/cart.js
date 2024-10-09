const mongoose = require('mongoose')
 

const cartSchema = new mongoose.Schema({
      user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
      cartItems:[{
        product:{type:mongoose.Schema.Types.ObjectId, ref:'Product', required:true},
        quantity:{type:Number, required:true},
        price:{type:Number, required:true}
      }],
      totalPrice:{type:Number, required:true},
      status:{type:String, default:'active'}

},{timestamp:true})

module.exports = mongoose.model('Cart', cartSchema)