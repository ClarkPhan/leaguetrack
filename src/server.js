require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const request = require('request');
const app = express();
const port = process.env.PORT || 3001;

const API = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/';
const API_KEY = process.env.API_KEY;

// use static content generated from build
app.use(express.static(path.join(__dirname, '../build')));

// parse application/json
app.use(bodyParser.json())

// test GET request
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/search', (req, res) => {
  console.log(req.body);
  let query = API + req.body.user + '?api_key=' + API_KEY;
  console.log(query);
  request(query, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      console.log(body)
      res.send(body);
    }
  })
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));