const userDetails =require("../Model/UserSchema")
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
    }
}

module.exports =object