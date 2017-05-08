require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./routers/router.snypprLocations'));
app.use(require('./routers/router.favorites'));
app.use(require('./routers/router.profiles'));
app.use(require('./routers/router.styles'));
app.use(require('./routers/router.transactions'));
app.use(require('./routers/router.stripe'));
app.use(require('./routers/router.reviews'));

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
