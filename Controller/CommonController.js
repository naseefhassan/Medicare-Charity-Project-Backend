const userDetails = require("../Model/UserSchema");
const twilio = require("../Utility/Twilio");
const twilioCheck=require("../Utility/TwiloCheck")

let object = {
  signupPost: async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body;

      const existingUser = await userDetails.findOne({ email: email });

      if (!existingUser) {
        const newUser = await new userDetails({
          username: username,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }).save();
        const UserIDFind = await userDetails.findOne({email:email})
        const UserID=UserIDFind._id
        req.session.token=UserID
        res.status(201).json({ message: "User created successfully." })
      } else {
        res
          .status(201)
          .json({ message: "User already exists with this email." });
      }
    } catch (error) {
      res.status(400).json({ message: "signup  error" });
    }
  },
  sentOtp: async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      twilio(phoneNumber);
      console.log(phoneNumber);
      res.status(200).json({ status: true });
    } catch (error) {
      res.status(404).json({ status: false });
    }
  },

  verifyOtp: async (req, res) => {
    try {
      const { otp } = req.body;
      twilioCheck(otp)
      console.log(otp, "verify");
      res.status(200).json({ status: true });
    } catch (error) {
      res.status(404).json({ status: false });
    }
  },
  LoginPost:async(req,res)=>{
    try {
      const  {email,password}=req.body
      const user=await userDetails.findOne({email})
      
      if(user && user.password == password){
        console.log(password);
        req.session.token =user._id
        res.status(200).json({message:"login successful"})
      }else{
        res.status(401).json({message:"login invaild "})
      }
    } catch (error) {
      console.error("login error",error)
      res.status(500).json({message:"login error"})
    }
  }
};
module.exports = object;
