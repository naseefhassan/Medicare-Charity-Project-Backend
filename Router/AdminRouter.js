/* eslint-disable max-len */
/* eslint-disable new-cap */
// const upload = require('../Utility/Multer');
const express = require('express');
const Router = express.Router();
const {PostNurse, editnurse, mobilityAids} = require('../Controller/AdminController');
const {upload} = require('../Utility/Multer');

Router.post('/PostNurse', upload.single('Image'), PostNurse);
Router.put('/editnurse', editnurse);
Router.post('/mobilityAids', mobilityAids);


module.exports = Router;
