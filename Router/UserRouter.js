/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require('express');
const Router = express.Router();
const { upload } = require('../Utility/Multer');
const verifyToken = require('../MiddleWare/JWT_Token');


const { profileupdate, profile, volunteerProfile, volunteerdata, nursedata, showMobility, addVehicle, showambulance, getprofile } =
    require('../Controller/UserController');

Router.get('/profile/:userId', verifyToken, profile);   
Router.post('/profileupdate', verifyToken, profileupdate);
Router.post('/getprofile', verifyToken, getprofile);

Router.post('/volunteerProfile', verifyToken, upload.single('image'), volunteerProfile);
Router.get('/volunteerdata', verifyToken, volunteerdata);
Router.get('/nursedata', verifyToken, nursedata);
Router.get('/showMobility', verifyToken, showMobility);
Router.post('/addVehicle', verifyToken, upload.single('image'), addVehicle);
Router.get('/showambulance', verifyToken, showambulance);

module.exports = Router;
