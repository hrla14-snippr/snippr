const multer = require('multer');
const Router = require('express').Router();
const s3Controller = require('../controllers/controller.s3');

// Multer config
// memory storage keeps file data in a buffer
const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in 54 Megabytes
  limits: { fileSize: 52428800 },
});

Router.post('/upload', upload.single('theseNamesMustMatch'), s3Controller.uploadPhotos);

module.exports = Router;
