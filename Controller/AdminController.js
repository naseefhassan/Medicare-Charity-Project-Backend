/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const NurseSchema = require('../Model/NurseSchema');
const upload = require('../Utility/Multer');
const object = {
  PostNurse: async (req, res) => {
    try {
      const {username, gender, age, phoneNumber, Qualification, Experience} =
        req.body;
      upload.single('Image')(req, res, async function(err) {
        if (err) {
          console.error('upload error', err);
          return res.status(400).json({message: 'Failed to upload images'});
        }

        const Image = req.file.location;
        console.log(Image);

        const newNurse = await new NurseSchema({
          username: username,
          gender: gender,
          age: age,
          phoneNumber: phoneNumber,
          Qualification: Qualification,
          Experience: Experience,
          Image: Image,
        }).save();
        res.status(200).json({message: 'Nurse details added'});
      });
    } catch (error) {
      console.error('Nurse profile error', error);
      res.status(500).json({message: 'internal server error'});
    }
  },
};

module.exports = object;
