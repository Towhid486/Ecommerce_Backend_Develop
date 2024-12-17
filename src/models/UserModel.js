const mongoose = require('mongoose')
const DataSchema = mongoose.Schema({
    email:{type:String,unique:true,required:true,lowercase:true},
    otp:{ type: String, default: "0" },
},
    {timestamps:true,versionKey:false}
)
const UserModel=mongoose.model('users',DataSchema)
module.exports=UserModel