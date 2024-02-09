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
        try {
            const{phoneNumber}=req.body
        twilio(phoneNumber)        
        console.log(phoneNumber );
        res.status(200).json({status: true})
        } catch (error) {
            res.status(404).json({status: false})
        }
    },
    
    verifyOtp:async(req,res)=>{
       try {
      const status= {otp,phoneNumber}=req.body
        console.log(otp,status,phoneNumber,"verify");
        res.status(200).json({status:true})
       } catch (error) {
        res.status(404).json({status:false})
       }
    }
    
}

module.exports =object
