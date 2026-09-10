const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,"Username must be unique"]
    },
    email:{
        type:String,
        required:true,
        unique:[true,"email must be unique"]
    },
    password:{
        type:String,
        required:true,    
    }
})

const User=mongoose.model("user",userSchema);

module.exports=User;