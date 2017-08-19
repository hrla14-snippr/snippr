require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Begin -Google Cloud API credentials
const gcloud = require('google-cloud')({
  projectId: 'Snypper',
  keyFilename: 'cloud.json',
});
// End - Google Cloud API credentials

// Begin - Google Cloud Vision API required
const vision = gcloud.vision();

// Begin - IBM Watson Personality Inisghts API 
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

const personality_insights = new PersonalityInsightsV3(require('../watson.json'));

// End - IBM Watson Personality Inisghts API 



app.use('/public', express.static('public'));
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./routers/router.snypprLocations'));
app.use(require('./routers/router.favorites'));
app.use(require('./routers/router.profiles'));
app.use(require('./routers/router.transactions'));
app.use(require('./routers/router.stripe'));
app.use(require('./routers/router.reviews'));
app.use(require('./routers/router.s3'));

// Begin - Google Cloud Vision API for scanning documents 
app.post('/cloudText/:image', (req, res, next) => {
  vision.detectText(req.params.image, (err, text, apiResponse) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(text);
    }
  });
});
// End - Google Cloud Vision API for scanning documents 

// Begin - Google Cloud Vision API for scanning faces and giving statistics on Anger, Joy, Sorrow, Surprise 
app.post('/cloudFaces/:image', (req, res, next) => {
  vision.detectFaces(req.params.image, (err, faces, apiResponse) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(faces);
    }
  });
});
// End - Google Cloud Vision API for scanning faces and giving statistics on Anger, Joy, Sorrow, Surprise 

// Begin - IBM Watson Personality Inisghts API 
app.post(`/personality/:text`, (req, res, next) => {
  const params = {
    text: req.params.text,
    consumption_preferences: true,
    raw_scores: true,
    headers: {
      "accept-language": "en",
      "accept": "application/json"
    }
  }
  personality_insights.profile(params, (error, response) => {
    if(error) {
      res.status(500).send(error);
    } else {
      res.status(201).send(response, null , 2);
    }
  })
})
// End - IBM Watson Personality Inisghts API 

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/../public/index.html')));

io.on('connection', (socket) => {
  console.log('sockets connected');
  socket.on('join', (data) => {
    console.log(data);
    socket.join(data.name);
  });
  socket.on('snypee-profile', (data) => {
    io.sockets.in(data.name).emit('snypee-profile', data);
  });
  socket.on('private-message', (data) => {
    console.log('message came thru', data);
    io.sockets.in(data.name).emit('private-message', data);
  });
  socket.on('payment-request', (data) => {
    console.log('payment requested', data);
    io.sockets.in(data.name).emit('payment-request', data);
  });
});


server.listen(process.env.PORT, () => console.log(`Listening on http://localhost:${process.env.PORT}`));
