const mongoose =require('mongoose')
const Bookschema=new mongoose.Schema({
    name:String,
    author:String,
    description:String,
    image:String,
    price:Number
})
module.exports=mongoose.model("Books",Bookschema);