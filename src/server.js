// Node Packages
import express from 'express';
import { json } from 'body-parser';
import { join } from 'path';
import axios from 'axios';
import { printData, romanToInt } from './utils';

// Load API Key
require('dotenv').config();

// Express
const app = express();
const port = process.env.PORT || 3001;

// API
const API = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
const RANK_API = 'https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/';
const API_KEY = `?api_key=${process.env.API_KEY}`;

// Use static content generated from build
app.use(express.static(join(__dirname, '../build')));

// Parse application/json
app.use(json());

// Test GET request
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/search', (req, res) => {
  console.log(req.body);
  let query = API + encodeURI(req.body.user) + API_KEY;
  let profileIconId = null;
  let summonerName = null;
  axios.get(query)
    .then((response) => {
      const { data } = response;
      query = RANK_API + data.id + API_KEY;
      summonerName = data.name;
      profileIconId = data.profileIconId;
      printData(data);
      return axios.get(query);
    })
    .then((response) => {
      const { data } = response;
      printData(data);
      let returnObj = {};
      data.forEach((queue) => {
        if (queue.queueType === 'RANKED_SOLO_5x5') {
          returnObj = queue;
          returnObj.tierMedal = `http://opgg-static.akamaized.net/images/medals/${queue.tier.toLowerCase()}_${romanToInt(queue.rank)}.png`;
        }
      });
      returnObj.profileIcon = `http://opgg-static.akamaized.net/images/profile_icons/profileIcon${profileIconId}.jpg`;
      returnObj.summonerName = summonerName;
      res.send(returnObj);
    })
    .catch(() => {
      res.send('Invalid Summoner!');
    });
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
