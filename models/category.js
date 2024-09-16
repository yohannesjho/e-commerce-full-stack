const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    
    name:{type:String, required:true},
    description:{type:String, required:true},
    img:[{type:String, required:false}]
})

module.exports = mongoose.model("Category",categorySchema)