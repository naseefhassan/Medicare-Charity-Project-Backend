/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable max-len */
const express = require('express');
const Router = express.Router();
const {
  signupPost,
  verifyOtp,
  LoginPost,
  forgotPassword,
  resetPassword,
} = require('../Controller/CommonController');

Router.post('/signupPost', signupPost);
Router.post('/verifyOtp', verifyOtp);
Router.post('/LoginPost', LoginPost);
Router.post('/forgotPassword', forgotPassword);
Router.post('/resetPassword/:id/:token', resetPassword);

module.exports = Router;
