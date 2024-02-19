/* eslint-disable new-cap */
const express=require('express');
const Router =express.Router();
const {PostNurse}=require('../Controller/AdminController');

Router.post('/PostNurse', PostNurse);

module.exports=Router;
