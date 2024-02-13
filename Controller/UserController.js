const Userprofile = require("../Model/ProfileSchema");
const { default: mongoose } = require("mongoose");
const userDetails = require("../Model/UserSchema");

const object = {
  profile: async (req, res) => {
    try {
       if(req.session.token){
        const data =await userDetails.findOne({_id:req.session.token})
        if(data){
            const profile =await userDetails.aggregate([
                {$match:{_id: new mongoose.Types.ObjectId(data._id)}},
                {
                    $lookup:{
                        from:"profiles",
                        localFiled:"_id",
                        foreignFiled:"UserId",
                        as:"profileDetails"
                    }
                }
            ])
            res.status(200).json({message:"Profile Success"})
        }else{
            res.status(404).json({message:"user not found"})
        }
       }
    
    } catch (error) {
        console.error("error in profile",error)
    }
  },
};

module.exports=object