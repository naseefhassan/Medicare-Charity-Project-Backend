const express=require("express")
const  Router = express.Router()
const {signupPost,sentOtp} = require("../Controller/CommonController")


Router.post("/signupPost",signupPost)
Router.post("/sentOtp",sentOtp)

module.exports=Router