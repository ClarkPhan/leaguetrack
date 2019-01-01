require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const request = require('request');
const app = express();
const port = process.env.PORT || 3001;

const API = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
const RANK_API = 'https://na1.api.riotgames.com/lol/league/v4/positions/by-summoner/'
const API_KEY = '?api_key=' + process.env.API_KEY;

// helper function to print data in console
printData = data => {
  console.log(JSON.stringify(JSON.parse(data), null, 2));
}

// use static content generated from build
app.use(express.static(path.join(__dirname, '../build')));

// parse application/json
app.use(bodyParser.json())

// test GET request
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/search', (req, res) => {
  let query = API + req.body.user + API_KEY;

  request(query, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      printData(body);
      console.log('********************');
      let profileIconId = JSON.parse(body).profileIconId;
      let summonerId = JSON.parse(body).id;
      let query = RANK_API + summonerId + API_KEY;
      console.log(query);
      request(query, (err, response, body) => {
        if (!err && response.statusCode == 200) {
          printData(body);
          let data = JSON.parse(body);
          let returnObj = {}
          if (data[0].queueType === "RANKED_SOLO_5x5") {
            returnObj = data[0];
          } else if (data[0].queueType === "RANKED_FLEX_SR") {
            returnObj = data[1];
          }
          returnObj.profileIconId = profileIconId;
          res.send(returnObj);
        } else {
          res.send("bad request");
        }
      })
    } else {
      res.send("bad request");
    }
  })
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));