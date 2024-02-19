const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  S3_REGION: process.env.S3_REGION,
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: function(req, res, cb) {
      cb(null, {filedName: filed.filedname});
    },
    key: function(req, res, cb) {
      cb(null, Date.now().toString()+'-'+file.originalname);
    },
  }),
});

module.exports = upload;
