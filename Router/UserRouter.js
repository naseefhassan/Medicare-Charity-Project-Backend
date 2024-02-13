const express=require("express")
const  Router = express.Router()
const {profile}=require("../Controller/UserController")

Router.get("/profile",profile)

module.exports=Router