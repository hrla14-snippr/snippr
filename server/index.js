require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => res.send('hello world'));

app.listen(process.env.PORT, () => console.log(`Listening on http://localhost:${process.env.PORT}`));