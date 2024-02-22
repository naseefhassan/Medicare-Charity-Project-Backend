const multer = require('multer');
const multerS3 = require('multer-s3');
const {S3Client} = require('@aws-sdk/client-s3');

const myBucket = process.env.S3_BUCKET_NAME;

const region = process.env.S3_REGION;
console.log(myBucket, region, 'ki');

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: myBucket,
    acl: 'public-read',
    metadata: function(req, file, cb) {
      cb(null, {filedName: file.filedname});
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});

module.exports = {upload, s3Client};

// require('dotenv').config();
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const {S3Client} = require('@aws-sdk/client-s3');

// const myBucket = process.env.MYBUCKET;

// const region = process.env.REGION;

// const s3Client = new S3Client({
//   region,
//   credentials: {
//     accessKeyId: process.env.ACCESSKEYID,
//     secretAccessKey: process.env.SECRETACCESSKEY,
//   },
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3Client,
//     bucket: myBucket,
//     metadata: function(req, file, cb) {
//       cb(null, {fieldName: file.originalname});
//     },
//     key: function(req, file, cb) {
//       cb(null, Date.now().toString() + '-' + file.originalname);
//     },
//   }),
// });

// module.exports=upload;
