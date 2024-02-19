const Userprofile = require('../Model/ProfileSchema');
const userDetails = require('../Model/UserSchema');

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
};

module.exports = object;
