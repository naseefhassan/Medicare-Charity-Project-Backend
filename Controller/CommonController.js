/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const userDetails = require('../Model/UserSchema');
const twilio = require('../Utility/Twilio');
const twilioCheck = require('../Utility/TwiloCheck');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {sendMail} = require('../Utility/Nodemailer');


const object = {
  signupPost: async (req, res) => {
    try {
      const {username, email, password} = req.body;
      const payload = req.body;

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
        const expires = 3 * 24 * 60 * 60;
        const token = jwt.sign({payload},
            process.env.SECRET_KEY, {expiresIn: expires},
        );
        res.status(201).json({message: 'User created successfully.', token});
      } else {
        res
            .status(400)
            .json({message: 'User already exists with this email.'});
      }
    } catch (error) {
      res.status(500).json({message: 'signup  error'});
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
      const payload = req.body;

      const expires = 3 * 24 * 60 * 60;
      const token = jwt.sign({payload},
          process.env.SECRET_KEY, {expiresIn: expires},
      );

      const passwordMatch = await bcrypt.compare(
          req.body.password,
          check.password,
      );
      if (passwordMatch) {
        res.status(200).json({message: 'login successful', role: check.role, token});
      } else {
        res.status(401).json({message: 'login invaild '});
      }
    } catch (error) {
      console.error('login error', error);
      res.status(500).json({message: 'login error'});
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const {email} = req.body;
      const user = await userDetails.findOne({email});
      if (!user) {
        return res.status(400).json({message: 'User does not exist'});
      }
      const expires = 3 * 24 * 60 * 60;
      const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: expires});

      const resetLink = `http://localhost:5173/resetpassword/${user._id}/${token}`;

      const {success, error} = await sendMail(email, resetLink);

      if (success) {
        res.status(200).json({message: 'Success'});
      } else {
        res.status(500).json({message: error});
      }
    } catch (error) {
      console.error('Forgot password error', error);
      res.status(500).json({message: 'Forgot password error'});
    }
  },
  resetPassword: async (req, res)=>{
    const {id, token} = req.params;
    const {password} = req.body;

    jwt.verify(token, process.env.SECRET_KEY, (error, decode)=>{
      if (error) {
        return res.json({message: 'invalid token'});
      } else {
        bcrypt.hash(password, 10)
            .then((hash) =>{
              userDetails.findByIdAndUpdate({_id: id}, {password: hash})
                  .then((u)=>res.status(200).json({message: 'Success'}))
                  .catch((err)=>res.status(400).json({message: err}));
            })
            .catch((err)=>res.status(500).json({message: err}));
      }
    });
  },

};
module.exports = object;
