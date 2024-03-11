/* eslint-disable new-cap */
/* eslint-disable max-len */
const express=require('express');
const Router = express.Router();
const verifyToken=require('../MiddleWare/JWT_Token');
const {signupPost, verifyOtp, LoginPost, forgotPassword, resetPassword} = require('../Controller/CommonController');


Router.post('/signupPost', signupPost);
Router.post('/verifyOtp', verifyOtp);
Router.post('/LoginPost', LoginPost);
Router.post('/forgotPassword', verifyToken, forgotPassword);
Router.post('/resetPassword/:id/:token', verifyToken, resetPassword);

module.exports=Router;
