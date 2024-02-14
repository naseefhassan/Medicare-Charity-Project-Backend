const userDetails = require("../Model/UserSchema");
const twilio = require("../Utility/Twilio");
const twilioCheck = require("../Utility/TwiloCheck");
const bcrypt = require("bcrypt");

let object = {
  signupPost: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const existingUser = await userDetails.findOne({ email: email });

      if (!existingUser) {
        console.log("swws");
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);
      console.log(hashPassword);

        const newUser = await new userDetails({
          username: username,
          email: email,
          password: hashPassword,
        }).save();
        console.log(newUser);
        res.status(201).json({ message: "User created successfully." });
      } else {
        res
          .status(201)
          .json({ message: "User already exists with this email." });
      }
    } catch (error) {
      res.status(400).json({ message: "signup  error" });
    }
  },
  sentOtp: async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      twilio(phoneNumber);
      res.status(200).json({ status: true });
    } catch (error) {
      res.status(404).json({ status: false });
    }
  },

  verifyOtp: async (req, res) => {
    try {
      const { otp } = req.body;
      twilioCheck(otp);
      res.status(200).json({ status: true });
    } catch (error) {
      res.status(404).json({ status: false });
    }
  },
  LoginPost: async (req, res) => {
    try {
      const { email } = req.body;
      const check = await userDetails.findOne({ email });

      const passwordMatch = await bcrypt.compare(
        req.body.password,
        check.password
      );
    console.log(passwordMatch);
      if (passwordMatch) {
        res.status(200).json({ message: "login successful" });
      } else {
        res.status(401).json({ message: "login invaild " });
      }
    } catch (error) {
      console.error("login error", error);
      res.status(500).json({ message: "login error" });
    }
  },
};
module.exports = object;
