const express=require("express")
const  Router = express.Router()
const {signupPost,sentOtp,verifyOtp} = require("../Controller/CommonController")


Router.post("/signupPost",signupPost)
Router.post("/sentOtp",sentOtp)
Router.post("/verifyOtp",verifyOtp)

module.exports=Router