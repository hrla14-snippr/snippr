const AWS = require('aws-sdk');
const db = require('../models/db');

// Amazon s3 config
const s3 = new AWS.S3(({ params: { Bucket: 'snyppr' } }));
AWS.config.update(
  {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    subregion: 'us-east-1',
  });


exports.uploadPhotos = ((req, res) => {
  // req.file is the 'theseNamesMustMatch' file
  // console.log(req.f);
  console.log(req.body.authId);
  // var bucket = new AWS.S3({params: {Bucket: 'snyppr'}})
  s3.upload({
    Key: req.file.originalname,
    Body: req.file.buffer,
    ACL: 'public-read', // your permisions
  }, (err, data) => {
    if (err) return res.status(400).send(err);
    console.log(data.Location);
    res.send('File uploaded to S3');
    return db.Snyppr.findOne({ where: { id: req.body.authId } })
    .then(({ id }) => db.SnypprImage
    .create({
      snypprId: id,
      url: data.Location,
    }))
    .then((dat) => {
      console.log(dat);
    });
  });
});
