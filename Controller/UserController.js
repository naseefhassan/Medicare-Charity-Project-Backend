/* eslint-disable max-len */
const Userprofile = require('../Model/ProfileSchema');
const userDetails = require('../Model/UserSchema');
const VolunteerSchema = require('../Model/VolunteerSchema');
const NurseSchema = require('../Model/NurseSchema');
const MobilitySchema = require('../Model/MobilityAids');
const VehicleSchema = require('../Model/AmbulanceSchema');


const object = {
  profile: async (req, res) => {
    try {
      if (req.session.token) {
        // Finding user based on token

        const data = await userDetails.findOne({_id: req.session.token});
        console.log(data, 'data');
        if (data) {
          const profile = await userDetails.aggregate([
            {$match: {_id: new mongoose.Types.ObjectId(data._id)}},
            {
              $lookup: {
                from: 'profiles',
                localFiled: '_id',
                foreignFiled: 'UserId',
                as: 'profileDetails',
              },
            },
          ]);
          res.status(200).json({message: 'Profile Success', profile});
        } else {
          res.status(404).json({message: 'user not found'});
        }
      }
    } catch (error) {
      console.error('error in profile', error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  },
  profileupdate: async (req, res) => {
    try {
      const {username, email, gender, age, phoneNumber} = req.body;
      await userDetails.updateOne(
          {_id: req.session.token},
          {$set: {username, email}},
      );

      const UserId = req.session.token;

      await Userprofile.updateOne(
          {UserId},
          {$set: {UserId, gender, age, phoneNumber}},
          {upsert: true},
      );
      console.log(UserId, gender);
      res.status(200).json({message: 'Profile Success'});
    } catch (error) {
      console.error('profile error', error);
      res.status(404).json({message: 'user not found'});
    }
  },
  getprofile: async (req, res)=>{
    try {
      const profileData = await userDetails.findOne({email});
      res.status(200).json({message: 'profile fetching success', profileData});
    } catch (error) {
      console.error(error);
    }
  },
  volunteerProfile: async (req, res) => {
    try {
      console.log('try');
      const {username, email, phoneNumber, gender, age, address, district, city} = req.body;
      const ImgUrl = req.file?.location;
      console.log(req.body);
      console.log(ImgUrl);


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
      res.status(200).json({message: 'volunteer profile added successfully'});
    } catch (error) {
      console.error(error, 'msg');
      res.status(400).json({message: 'volunteer profile adding failed'});
    }
  },
  volunteerdata: async (req, res) => {
    try {
      const volunteer = await VolunteerSchema.find();
      res.status(200).json({message: 'volunteer data fetching success', volunteer});
    } catch (error) {
      res.status(400).json({message: 'volunteer data fetching failed'});
    }
  },
  nursedata: async (req, res) => {
    try {
      const Nurse = await NurseSchema.find();
      res.status(200).json({message: 'nurse data fetching success', Nurse});
    } catch (error) {
      res.status(400).json({message: 'nurse data fetching failed'});
    }
  },
  showMobility: async (req, res) => {
    try {
      const Mobility = await MobilitySchema.find();
      res.status(200).json({message: 'mobility data fetching success', Mobility});
    } catch (error) {
      res.status(400).json({message: 'mobility data fetching failed'});
    }
  },
  addVehicle: async (req, res) => {
    try {
      const {ownerName, email, phoneNumber, vehicleNumber, vehicleGrade, vehicleModel} = req.body;
      const Imgurl = req.file.location;

      const existingVehicle = await VehicleSchema.findOne({vehicleNumber});

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

        res.status(200).json({message: 'Ambulance added successfully'});
      } else {
        res.status(400).json({message: 'This vehicle is already exists'});
      }
    } catch (error) {
      res.status(500).json({message: 'Internal server error'});
    }
  },
  showambulance: async (req, res)=>{
    try {
      const ambulance = await VehicleSchema.find();
      res.status(200).json({message: 'ambulance fetching failed', ambulance});
    } catch (error) {
      console.log(error);
    }
  },

};
module.exports = object;
