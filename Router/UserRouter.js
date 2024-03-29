/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require('express');
const Router = express.Router();
const {upload} = require('../Utility/Multer');
const verifyToken = require('../MiddleWare/JWT_Token');
const razorpay = require('../Utility/Razorpay');

const {
  profileupdate,
  profile,
  volunteerProfile,
  volunteerdata,
  nursedata,
  showMobility,
  addVehicle,
  showambulance,
  getprofile,
  userInfo,
  getUser,
  donate,
  save_payment,
  getBookingNurse,
  bookingStatus,
  getMobilityBooking,
  MobilitybookingStatus,
} = require('../Controller/UserController');

Router.get('/profile/:userId', verifyToken, profile);
Router.post('/profileupdate', verifyToken, profileupdate);
Router.post('/getprofile', verifyToken, getprofile);
Router.post(
    '/volunteerProfile',
    verifyToken,
    upload.single('image'),
    volunteerProfile,
);
Router.get('/volunteerdata', verifyToken, volunteerdata);
Router.get('/nursedata', verifyToken, nursedata);
Router.get('/showMobility', verifyToken, showMobility);
Router.post('/addVehicle', verifyToken, upload.single('image'), addVehicle);
Router.get('/showambulance', verifyToken, showambulance);
Router.get('/userInfo', userInfo);
Router.get('/getUser', getUser);
Router.post('/payment/:amount', razorpay);
Router.post('/donate', donate);
Router.post('/save_payment', save_payment);
Router.get('/getBookingNurse/:nurseId', getBookingNurse);
Router.post('/bookingStatus/:bookId', bookingStatus);
Router.get('/getMobilityBooking/:MobilityId', getMobilityBooking);
Router.post('/MobilitybookingStatus/:bookId', MobilitybookingStatus);

module.exports = Router;
