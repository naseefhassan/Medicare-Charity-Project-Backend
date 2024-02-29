/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require('express');
const Router = express.Router();
const {upload} = require('../Utility/Multer');

const {profileupdate, profile, volunteerProfile} = require('../Controller/UserController');

Router.post('/profileupdate', profileupdate);
Router.get('/profile', profile);
Router.post('/volunteerProfile', upload.single('image'), volunteerProfile);

module.exports = Router;
