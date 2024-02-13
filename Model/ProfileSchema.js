const mongoose=require("mongoose")

const ProfileSchema = new mongoose.Schema({
    UserId:{type:mongoose.Types.ObjectId,required:true},
    userName:{type:String,required:true},
    email:{type:String,required:true},
    gender:{type:String,required:true},
    age:{type:String,required:true},
    phoneNumber:{type:String,required:true}
})

const  profile = new mongoose.model("profiles",ProfileSchema)

module.exports=profile