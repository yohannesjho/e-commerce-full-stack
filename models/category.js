const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    name:{type:String, required:true},
    description:{type:String, required:true},
    img:{type:String, required:false}
})

module.exports = mongoose.model("Category",categorySchema)