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
} = require('../Controller/AdminController');
const {upload} = require('../Utility/Multer');
const verifyToken = require('../MiddleWare/JWT_Token');

Router.post('/PostNurse', verifyToken, upload.single('Image'), PostNurse);
Router.get('/showNurse', showNurse);
Router.put('/editnurse/:nurseId', verifyToken, editnurse);
Router.post('/delNurse/:delId', delNurse);
Router.post('/mobilityAids', mobilityAids);

module.exports = Router;
