const AWS = require('aws-sdk');

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
   console.log(req.file);
  // var bucket = new AWS.S3({params: {Bucket: 'snyppr'}})
  s3.putObject({
    Key: req.file.originalname,
    Body: req.file.buffer,
    ACL: 'public-read', // your permisions
  }, (err) => {
    if (err) return res.status(400).send(err);
    return res.send('File uploaded to S3');
  });
});
