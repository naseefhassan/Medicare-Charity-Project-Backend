const userDetails = require("../Model/UserSchema");
const twilio = require("../Utility/Twilio");

let object = {
  signupPost: async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body;

      const existingUser = await userDetails.findOne({ email: email });

      if (!existingUser) {
        const newUser = await new userDetails({
          username: username,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }).save();
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
      console.log(phoneNumber);
      res.status(200).json({ status: true });
    } catch (error) {
      res.status(404).json({ status: false });
    }
  },

  verifyOtp: async (req, res) => {
    try {
      const { otp } = req.body;
      twilio(otp)
      console.log(otp, "verify");
      res.status(200).json({ status: true });
    } catch (error) {
      res.status(404).json({ status: false });
    }
  },
};

module.exports = object;
