/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const NurseSchema = require('../Model/NurseSchema');
const MobilitySchema = require('../Model/MobilityAids');
const UserSchema = require('../Model/UserSchema');

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

      const nurseId = req.params.nurseId;

      const nurse = await NurseSchema.findByIdAndUpdate(
          nurseId,
          {
            username: username,
            gender: gender,
            age: age,
            phoneNumber: phoneNumber,
            Qualification: Qualification,
            Experience: Experience,
          },
          {new: true},
      );
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
      const delNurse = await NurseSchema.findByIdAndUpdate(
          delNurseId,
          {delStatus: true},
          {new: true},
      );

      res.status(200).json({message: 'Nurse data deleted', delNurseId});
    } catch (error) {
      console.error(error, 'deleteing failed');
      res.status(404).json({message: 'deleting failed'});
    }
  },
  mobilityAids: async (req, res) => {
    try {
      const {item, brand, color, material, rate, description} = req.body;
      const ImgUrl = req.file.location;

      const newMobilityAids = await new MobilitySchema({
        item: item,
        brand: brand,
        color: color,
        material: material,
        rate: rate,
        description: description,
        image: ImgUrl,
      }).save();
      res.status(200).json({message: 'data added successfully'});
    } catch (error) {
      res.status(400).json({message: 'data entry failed'});
    }
  },
  showMobilityAids: async (req, res) => {
    try {
      const MobilityAidsData = await MobilitySchema.find();
      res
          .status(200)
          .json({
            message: 'data finded from mobility aids schema',
            MobilityAidsData,
          });
    } catch {
      res.status(400).json({message: 'mobility aids feching failed'});
    }
  },
  toolsDelId: async (req, res) => {
    const toolsDelId = req.params.toolsDelId;
    try {
      const deletetools = await MobilitySchema.findByIdAndDelete(toolsDelId);
      res.status(200).json({message: 'mobility aids deleted successfully'});
    } catch {
      res.status(400).json({message: 'mobility aids deleting failed'});
    }
  },
  editMobilityAids: async (req, res) => {
    try {
      const {item, brand, color, material, rate, description} = req.body;
      const toolsId = req.params.toolsId;

      const MobilityTools = await MobilitySchema.findByIdAndUpdate(toolsId, {
        item: item,
        brand: brand,
        color: color,
        material: material,
        rate: rate,
        description: description,
      }, {new: true});

      res.status(200).json({message: 'mobility aids ediiting success', MobilityTools});
    } catch (error) {
      res.status(400).json({message: 'mobility aids editing failed'});
    }
  },
  userProfile: async (req, res)=>{
    try {
      const Userprofile =await UserSchema.find();
      res.status(200).json({message: 'user fecthing success', Userprofile});
    } catch (error) {
      res.status(400).json({message: 'user fetching failed'});
    }
  },
};

module.exports = object;
