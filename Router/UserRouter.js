const express=require('express');
const Router = express.Router();
const {profileupdate, profile}=require('../Controller/UserController');

Router.post('/profileupdate', profileupdate);
Router.get('/profile', profile);

module.exports=Router;
