/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require('express');
const Router = express.Router();
const {profileupdate, profile, volunteerProfile} = require('../Controller/UserController');

Router.post('/profileupdate', profileupdate);
Router.get('/profile', profile);
Router.post('/volunteerProfile', volunteerProfile);

module.exports = Router;
