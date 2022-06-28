const mongoose=require("mongoose")
const userschema= new mongoose.Schema({

     name:{
        type:String
     },

     age:{
        type:Number
     },

     isValid:{
        type:Boolean
     }
})

module.exports=mongoose.model("users",userschema)