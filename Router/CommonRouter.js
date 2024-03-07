/* eslint-disable new-cap */
/* eslint-disable max-len */
const express=require('express');
const Router = express.Router();
const verifyToken=require('../MiddleWare/JWT_Token');
const {signupPost, verifyOtp, LoginPost} = require('../Controller/CommonController');


Router.post('/signupPost', signupPost);
Router.post('/verifyOtp', verifyOtp);
Router.post('/LoginPost', LoginPost);

module.exports=Router;
