/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const NurseSchema = require('../Model/NurseSchema');
const MobilitySchema = require('../Model/MobilityAids');
const upload = require('../Utility/Multer');
const object = {
  PostNurse: async (req, res) => {
    try {
      const {username, gender, age, phoneNumber, Qualification, Experience} =
        req.body;
      const ImgUrl = req.file.location;

      const newNurse = await new NurseSchema({
        username: username,
        gender: gender,
        age: age,
        phoneNumber: phoneNumber,
        Qualification: Qualification,
        Experience: Experience,
        Image: ImgUrl,
      }).save();

      res.status(200).json({message: 'Nurse details added'});
    } catch (error) {
      console.error('Nurse profile error', error);
      res.status(500).json({message: 'internal server error'});
    }
  },
  showNurse: async (req, res) => {
    try {
      const NurseData = await NurseSchema.find();
      res.status(200).json({message: 'nurse data found', NurseData});
    } catch (error) {
      res.status(200).json({message: 'nurse data not found'});
    }
  },

  editnurse: async (req, res) => {
    try {
      const {username, gender, age, phoneNumber, Qualification, Experience} =
        req.body;
      console.log(req.body, 'reqqqqqqq');
      

      const nurseId = req.params.nurseId;
      console.log('l', nurseId, 'iddddddd');

      const nurse = await NurseSchema.findByIdAndUpdate(nurseId, {
        username: username,
        gender: gender,
        age: age,
        phoneNumber: phoneNumber,
        Qualification: Qualification,
        Experience: Experience,
      }, {new: true});
      console.log(nurse, ',,,,,,');
      if (!nurse) {
        res.status(404).json({message: 'Nurse not found'});
      }

      await nurse.save();
      res
          .status(200)
          .json({message: 'Nurse details updated successfully', nurse});
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Internal server error'});
    }
  },
  delNurse: async (req, res) => {
    try {
      const delNurseId = req.params.delId;
      const delNurse = await NurseSchema.findByIdAndUpdate(delNurseId, {delStatus: true}, {new: true});

      res.status(200).json({message: 'Nurse data deleted', delNurseId});
    } catch (error) {
      console.error(error, 'deleteing failed');
      res.status(404).json({message: 'deleting failed'});
    }
  },
  mobilityAids: async (req, res) => {
    const {Item, Brand, Color, Material, Rate, Description, Image} = req.body;
    console.log(req.body);
    try {
      const newMobilityAids = await new MobilitySchema({
        Item: Item,
        Brand: Brand,
        Color: Color,
        Material: Material,
        Rate: Rate,
        Description: Description,
        Image: Image,
      }).save();

      res.status(200).json({message: 'data added successfully'});
    } catch (error) {
      res.status(400).json({message: 'data entry failed'});
    }
  },
};

module.exports = object;
// const nurse = await NurseSchema.updateOne(nurseId);
// console.log(nurse, 'nurseeeeeeee');

// nurse.username = username;
// nurse.gender = gender;
// nurse.age = age;
// nurse.phoneNumber = phoneNumber;
// nurse.Qualification = Qualification;
// nurse.Experience = Experience;
// await nurse.save();
