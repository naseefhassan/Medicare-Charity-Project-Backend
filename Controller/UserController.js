/* eslint-disable new-cap */
/* eslint-disable max-len */
const Userprofile = require("../Model/ProfileSchema");
const userDetails = require("../Model/UserSchema");
const VolunteerSchema = require("../Model/VolunteerSchema");
const NurseSchema = require("../Model/NurseSchema");
const MobilitySchema = require("../Model/MobilityAids");
const VehicleSchema = require("../Model/AmbulanceSchema");
const jwt = require("jsonwebtoken");
const razorpay = require("../Utility/Razorpay");
const PaymentSchema = require("../Model/Payment");
const Razorpay = require("razorpay");
<<<<<<< HEAD
const { userProfile } = require("./AdminController");
=======
>>>>>>> a17f81dce5a04ab39ccf813d04d96c32c422bca0
const object = {
  profile: async (req, res) => {
    try {
      const _id = req.params.userId;
      const userData = await userDetails.findOne({ _id });
      const profileData = await Userprofile.find();

      res
        .status(200)
        .json({ message: " profile success", userData ,profileData});
    } catch (error) {
      console.error("error in profile", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  profileupdate: async (req, res) => {
    try {
      const { username, gender, age, phoneNumber, userId } = req.body;
      await userDetails.findByIdAndUpdate(
        userId,
        {
          username: username,
        },
        { new: true }
      );

      await Userprofile.updateOne(
        { userId },
        {
          username: username,
          gender,
          gender,
          age,
          age,
          phoneNumber: phoneNumber,
        },
        { new: true }
      );

      res.status(200).json({ message: "Profile Success" });
    } catch (error) {
      console.error("profile error", error);
      res.status(404).json({ message: "user not found" });
    }
  },
  getprofile: async (req, res) => {
    try {
      let token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      token = token.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const profileData = await userDetails.findOne({
        email: decodedToken.payload.email,
      });
      res
        .status(200)
        .json({ message: "profile fetching success", profileData });
    } catch (error) {
      console.error(error, "fecthing error");
      res.status(400).json({ message: "profile fetching failed" });
    }
  },
  volunteerProfile: async (req, res) => {
    try {
      const {
        username,
        email,
        phoneNumber,
        gender,
        age,
        address,
        district,
        city,
      } = req.body;
      const ImgUrl = req.file?.location;

      // eslint-disable-next-line no-unused-vars
      const volunteerData = await new VolunteerSchema({
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        gender: gender,
        age: age,
        address: address,
        district: district,
        city: city,
        vimage: ImgUrl,
      }).save();
      res.status(200).json({ message: "volunteer profile added successfully" });
    } catch (error) {
      console.error(error, "msg");
      res.status(400).json({ message: "volunteer profile adding failed" });
    }
  },
  volunteerdata: async (req, res) => {
    try {
      const volunteer = await VolunteerSchema.find();
      res
        .status(200)
        .json({ message: "volunteer data fetching success", volunteer });
    } catch (error) {
      res.status(400).json({ message: "volunteer data fetching failed" });
    }
  },
  nursedata: async (req, res) => {
    try {
      const Nurse = await NurseSchema.find();
      res.status(200).json({ message: "nurse data fetching success", Nurse });
    } catch (error) {
      res.status(400).json({ message: "nurse data fetching failed" });
    }
  },
  showMobility: async (req, res) => {
    try {
      const Mobility = await MobilitySchema.find();
      res
        .status(200)
        .json({ message: "mobility data fetching success", Mobility });
    } catch (error) {
      res.status(400).json({ message: "mobility data fetching failed" });
    }
  },
  addVehicle: async (req, res) => {
    try {
      const {
        ownerName,
        email,
        phoneNumber,
        vehicleNumber,
        vehicleGrade,
        vehicleModel,
      } = req.body;
      const Imgurl = req.file.location;

      const existingVehicle = await VehicleSchema.findOne({ vehicleNumber });

      if (!existingVehicle) {
        const newVehicle = new VehicleSchema({
          ownerName,
          email,
          phoneNumber,
          vehicleNumber,
          vehicleGrade,
          vehicleModel,
          image: Imgurl,
        });

        await newVehicle.save();

        res.status(200).json({ message: "Ambulance added successfully" });
      } else {
        res.status(400).json({ message: "This vehicle is already exists" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  showambulance: async (req, res) => {
    try {
      const ambulance = await VehicleSchema.find();
      res.status(200).json({ message: "ambulance fetching failed", ambulance });
    } catch (error) {
      console.error(error);
    }
  },
  userInfo: async (req, res) => {
    try {
      let token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      token = token.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const userInfo = await userDetails.findOne({
        email: decodedToken.payload.email,
      });
      res.status(200).json({ message: "profile fetching success", userInfo });
    } catch {
      res.status(400).json({ message: "failed" });
    }
  },
  getUser: async (req, res) => {
    try {
      let token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      token = token.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const userInfo = await userDetails.findOne({
        email: decodedToken.payload.email,
      });
      res.status(200).json({ message: "getUser success", userInfo });
    } catch {
      res.status(400).json({ message: "failed" });
    }
  },

  razorpay: razorpay,

<<<<<<< HEAD
  donate: async (req, res) => {
=======
  donate:async(req,res)=>{
>>>>>>> a17f81dce5a04ab39ccf813d04d96c32c422bca0
    try {
      const razorpay = new Razorpay({
        key_id: process.env.RazorPay_Key_Id,
        key_secret: process.env.RazorPay_Secert_Key,
      });
<<<<<<< HEAD
      const { amount } = req.body;
=======
      const {amount}=req.body
>>>>>>> a17f81dce5a04ab39ccf813d04d96c32c422bca0
      const options = {
        amount: amount, // amount in the smallest currency unit (e.g., paisa for INR)
        currency: "INR",
        receipt: "order_rcptid_11",
        payment_capture: 0,
      };
<<<<<<< HEAD

      const response = await razorpay.orders.create(options);

=======
  
      const response = await razorpay.orders.create(options);
  
>>>>>>> a17f81dce5a04ab39ccf813d04d96c32c422bca0
      res.status(200).json({ message: "cresteorder", response });
    } catch (error) {
      console.error(error);
    }
  },
  save_payment: async (req, res) => {
    try {
      const { orderId, paymentId, amount, status } = req.body;
      // Save payment details to your database
      const payment = await new PaymentSchema({
        orderId,
        paymentId,
        amount,
        status,

        // Add any other payment details you want to save
      });
      payment.save();
      res.status(200).json({ message: "payment details saved successfully" });
    } catch (error) {
      console.error("Error saving payment:", error);
      res.status(500).json({
        message: "save Payment failed",
        error: "Failed to save payment",
      });
    }
  },
  getBookingNurse: async (req, res) => {
    try {
      const _id = req.params.nurseId;
      const NurseDetails = await NurseSchema.findOne({ _id });
      res.status(200).json({ message: "success", NurseDetails });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Failed " });
    }
  },
  bookingStatus: async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const booking = await NurseSchema.findByIdAndUpdate(
        bookId,
        { booking: true },
        { new: true }
      );
    } catch (error) {
      console.error(error);
    }
  },
  getMobilityBooking: async (req, res) => {
    try {
      const _id = req.params.MobilityId;
      const MobilityAids = await MobilitySchema.findOne({ _id });
      res.status(200).json({ message: "success", MobilityAids });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Failed " });
    }
  },
<<<<<<< HEAD
  MobilitybookingStatus: async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const booking = await MobilitySchema.findByIdAndUpdate(
        bookId,
        { booking: true },
        { new: true }
      );
=======
  MobilitybookingStatus:async(req,res)=>{
    try {
      const bookId = req.params.bookId
      const booking = await MobilitySchema.findByIdAndUpdate( bookId, {booking: true},{new: true},
    );

>>>>>>> a17f81dce5a04ab39ccf813d04d96c32c422bca0
    } catch (error) {
      console.error(error);
    }
  },
};
module.exports = object;
