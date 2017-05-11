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

exports.uploadProfilePic = (req, res) => {
  console.log(req.params.authId);
  // var bucket = new AWS.S3({params: {Bucket: 'snyppr'}})
  s3.upload({
    Key: req.file.originalname,
    Body: req.file.buffer,
    ACL: 'public-read', // your permisions
  }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      console.log(data.Location);
      res.send('File uploaded to S3');
      if (req.params.type === 'snyppr') {
        db.Snyppr.findOne({ where: { id: req.params.authId } })
      .then(({ id }) => db.ProfilePic
      .create({
        snypprId: id,
        url: data.Location,
      }))
      .then((dat) => {
        console.log(dat);
      });
      } else {
        db.Snypee.findOne({ where: { id: req.params.authId } })
      .then(({ id }) => db.ProfilePic
      .create({
        snypeeId: id,
        url: data.Location,
      }))
      .then((dat) => {
        console.log(dat);
      });
      }
    }
  });
};
////////////////////////////////////
exports.uploadCertificatePic = (req, res) => {
  console.log(req.params.authId);
  // var bucket = new AWS.S3({params: {Bucket: 'snyppr'}})
  s3.upload({
    Key: req.file.originalname,
    Body: req.file.buffer,
    ACL: 'public-read', // your permisions
  }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      console.log('datalocation', data.Location);
      res.send('File uploaded to S3');
      if (req.params.type === 'snyppr') {
        db.Snyppr.findOne({ where: { id: req.params.authId } })
      .then(({ id }) => db.CertificatePic
      .create({
        snypprId: id,
        url: data.Location,
      }))
      .then((datum) => {
        console.log('this is the datum', datum._previousDataValues.url);
      });
      }
    }
  });
};
////////////////////////////////////
exports.getCertificatePic = (req, res) => {
  db.CertificatePic.findOne({
    where: {
      snypprId: req.params.snypprId,
    },
  })
  .then((data) => {
    res.status(200).send(data);
  });
};
////////////////////////////////////
exports.getProfilePic = (req, res) => {
  console.log(req.params);
  if (req.params.type === 'synppr') {
    db.ProfilePic.findAll({ where: { snypprId: req.params.authId } })
    .then((responseData) => {
      res.send(responseData);
      console.log(responseData);
    });
  } else {
    db.ProfilePic.findAll({ where: { snypeeId: req.params.authId } })
    .then((responseData) => {
      res.send(responseData);
      console.log(responseData);
    });
  }
};

exports.uploadPhotos = ((req, res) => {
  // req.file is the 'theseNamesMustMatch' file
  // console.log(req.f);
  console.log(req.params.authId);
  // var bucket = new AWS.S3({params: {Bucket: 'snyppr'}})
  s3.upload({
    Key: req.file.originalname,
    Body: req.file.buffer,
    ACL: 'public-read', // your permisions
  }, (err, data) => {
    if (err) return res.status(400).send(err);
    console.log(data.Location);
    res.send('File uploaded to S3');
    return db.Snyppr.findOne({ where: { id: req.params.authId } })
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

exports.getPhotos = ((req, res) => {
  console.log('params', req.params);
  db.SnypprImage.findAll({ where: { snypprId: req.params.authId } })
  .then((responseData) => {
    res.send(responseData);
    console.log(responseData);
  });
});
