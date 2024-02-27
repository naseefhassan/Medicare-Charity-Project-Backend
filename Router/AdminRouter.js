/* eslint-disable max-len */
/* eslint-disable new-cap */
// const upload = require('../Utility/Multer');
const express = require('express');
const Router = express.Router();
const {
  PostNurse,
  showNurse,
  editnurse,
  delNurse,
  mobilityAids,
  showMobilityAids,
  toolsDelId,
} = require('../Controller/AdminController');
const {upload} = require('../Utility/Multer');
const verifyToken = require('../MiddleWare/JWT_Token');

Router.post('/PostNurse', verifyToken, upload.single('Image'), PostNurse);
Router.get('/showNurse', showNurse);
Router.put('/editnurse/:nurseId', verifyToken, editnurse);
Router.post('/delNurse/:delId', verifyToken, delNurse);
Router.post('/mobilityAids', verifyToken, upload.single('image'), mobilityAids);
Router.get('/showMobilityAids', showMobilityAids);
Router.delete('/mobilityDelete/:toolsDelId', toolsDelId)



module.exports = Router;
