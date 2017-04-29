require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./routers/router.barberLocations'));
app.use(require('./routers/router.favorites'));
app.use(require('./routers/router.login'));
app.use(require('./routers/router.styles'));
app.use(require('./routers/router.transactions'));

app.get('*',  (req, res) => res.sendFile(path.join(__dirname, '/../client/index.html')));

app.listen(process.env.PORT, () => console.log(`Listening on http://localhost:${process.env.PORT}`));