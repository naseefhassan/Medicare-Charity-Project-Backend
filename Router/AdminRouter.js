/* eslint-disable max-len */
/* eslint-disable new-cap */
// const upload = require('../Utility/Multer');
const express = require('express');
const Router = express.Router();
const {upload} = require('../Utility/Multer');
const verifyToken = require('../MiddleWare/JWT_Token');

const {
  PostNurse,
  showNurse,
  editnurse,
  delNurse,
  mobilityAids,
  showMobilityAids,
  toolsDelId,
  editMobilityAids,
  userProfile,
  showVehicle,
  getAdmin,
} = require('../Controller/AdminController');


Router.post('/PostNurse', verifyToken, upload.single('Image'), PostNurse);
Router.get('/showNurse', verifyToken, showNurse);
Router.put('/editnurse/:nurseId', verifyToken, editnurse);
Router.post('/delNurse/:delId', verifyToken, delNurse);
Router.post('/mobilityAids', verifyToken, upload.single('image'), mobilityAids);
Router.get('/showMobilityAids', verifyToken, showMobilityAids);
Router.delete('/mobilityDelete/:toolsDelId', verifyToken, toolsDelId);
Router.put('/editMobilityAids/:toolsId', verifyToken, editMobilityAids);
Router.get('/userProfile', verifyToken, userProfile );
Router.get('/showVehicle', verifyToken, showVehicle);
Router.get('/getAdmin', verifyToken, getAdmin);


module.exports = Router;
