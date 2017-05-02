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
app.use(require('./routers/router.barberLocations'));
app.use(require('./routers/router.favorites'));
app.use(require('./routers/router.profiles'));
app.use(require('./routers/router.styles'));
app.use(require('./routers/router.transactions'));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/../public/index.html')));

io.on('connection', (socket) => {
  console.log('sockets connected');
  socket.on('join', (data) => {
    console.log(data);
    socket.join(data.email);
  });
  socket.on('private-message', (data) => {
    io.sockets.in(data.email).emit('private-message', { msg: data });
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(process.env.PORT, () => console.log(`Listening on http://localhost:${process.env.PORT}`));
