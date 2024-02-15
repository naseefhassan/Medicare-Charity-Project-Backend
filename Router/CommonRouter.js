const express=require("express")
const  Router = express.Router()
const verifyToken=require("../MiddleWare/JWT_Token")
const {signupPost,sentOtp,verifyOtp,LoginPost} = require("../Controller/CommonController")


Router.post("/signupPost",signupPost)
Router.post("/sentOtp",sentOtp)
Router.post("/verifyOtp",verifyOtp)
Router.post("/LoginPost",verifyToken,LoginPost)

module.exports=Router