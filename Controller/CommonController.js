/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const userDetails = require('../Model/UserSchema');
const twilio = require('../Utility/Twilio');
const twilioCheck = require('../Utility/TwiloCheck');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const object = {
  signupPost: async (req, res) => {
    try {
      const {username, email, password} = req.body;
      const payload=req.body;

      const existingUser = await userDetails.findOne({email: email});

      if (!existingUser) {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await new userDetails({
          username: username,
          email: email,
          password: hashPassword,
        }).save();

        // gernerating token
        const token =jwt.sign({payload},
            process.env.SECRET_KEY, {expiresIn: '1h'},
        );
        res.status(201).json({message: 'User created successfully.', token});
      } else {
        res
            .status(400)
            .json({message: 'User already exists with this email.'});
      }
    } catch (error) {
      res.status(400).json({message: 'signup  error'});
    }
  },

  verifyOtp: async (req, res) => {
    try {
      const {otp, phoneNumber} = req.body;
      twilio(phoneNumber);

      twilioCheck(otp, phoneNumber);
      res.status(200).json({status: true});
    } catch (error) {
      res.status(404).json({status: false});
    }
  },

  LoginPost: async (req, res) => {
    try {
      const {email} = req.body;
      const check = await userDetails.findOne({email});

      const passwordMatch = await bcrypt.compare(
          req.body.password,
          check.password,
      );
      if (passwordMatch) {
        res.status(200).json({message: 'login successful', role: check.role});
      } else {
        res.status(401).json({message: 'login invaild '});
      }
    } catch (error) {
      console.error('login error', error);
      res.status(500).json({message: 'login error'});
    }
  },
};
module.exports = object;
