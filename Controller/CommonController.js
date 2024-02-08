const userDetails =require("../Model/UserSchema")
const twilio=require("../Utility/Twilio")
let object={
    signupPost: async(req,res)=>{
        const{username,email,password,confirmPassword}=req.body

        const newUser=await new userDetails({
            username:username,
            email:email,
            password:password,
            confirmPassword:confirmPassword
        }).save()

        console.log(req.body);
    },
    sentOtp:  async(req,res)=>{
        const{phoneNumber}=req.body
        twilio(phoneNumber)        
        console.log(phoneNumber);
    }
    
}

module.exports =object