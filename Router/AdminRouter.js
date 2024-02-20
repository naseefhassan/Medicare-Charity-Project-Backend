/* eslint-disable new-cap */
const express=require('express');
const Router =express.Router();
const {PostNurse, editnurse}=require('../Controller/AdminController');

Router.post('/PostNurse', PostNurse);
Router.put('/editnurse', editnurse);

module.exports=Router;
