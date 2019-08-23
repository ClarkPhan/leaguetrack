// Node Packages
import express from 'express';
import { json } from 'body-parser';
import { join } from 'path';
import request from 'request';

require('dotenv').config();

// Express
const app = express();
const port = process.env.PORT || 3001;

// API
const API = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
const RANK_API = 'https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/';
const API_KEY = `?api_key=${process.env.API_KEY}`;

// Helper function to print data in console
const printData = (data) => {
  console.log(JSON.stringify(JSON.parse(data), null, 2));
};

// Helper function to convert roman numerals into integers
const romanToInt = (num) => {
  const roman = ['I', 'II', 'III', 'IV'];
  const value = ['1', '2', '3', '4'];
  for (let i = 0; i < roman.length; i += 1) {
    if (roman[i] === num) {
      return value[i].toString();
    }
  }
  return 'error';
};

// Use static content generated from build
app.use(express.static(join(__dirname, '../build')));

// Parse application/json
app.use(json());

// Test GET request
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/search', (req, res) => {
  let query = API + encodeURI(req.body.user) + API_KEY;
  request(query, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      printData(body);
      const parsedData = JSON.parse(body);
      query = RANK_API + parsedData.id + API_KEY;
      request(query, (err, response, body) => {
        if (!err && response.statusCode === 200) {
          printData(body);
          const data = JSON.parse(body);
          let returnObj = {};
          data.forEach((queue) => {
            if (queue.queueType === "RANKED_SOLO_5x5") {
              returnObj = queue;
              returnObj.tierMedal = `http://opgg-static.akamaized.net/images/medals/${queue.tier.toLowerCase()}_${romanToInt(queue.rank)}.png`;
            }
          });
          returnObj.profileIcon = `http://opgg-static.akamaized.net/images/profile_icons/profileIcon${parsedData.profileIconId}.jpg`;
          returnObj.summonerName = parsedData.name;
          res.send(returnObj);
        } else {
          res.send('Invalid Summoner!');
        }
      });
    } else {
      res.send('Invalid Summoner!');
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
