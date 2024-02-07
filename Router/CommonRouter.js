const express=require("express")
const  Router = express.Router()
const {signupPost} = require("../Controller/CommonController")


Router.post("/signupPost",signupPost)

module.exports=Router