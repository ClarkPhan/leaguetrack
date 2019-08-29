// Node Packages
import express from 'express';
import { json } from 'body-parser';
import { join } from 'path';
import axios from 'axios';
import { romanToInt } from './utils';

// Load API Key
require('dotenv').config();

// Express
const app = express();
const port = process.env.PORT || 3001;

// API
const API = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
const RANK_API = 'https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/';
const API_KEY = `?api_key=${process.env.API_KEY}`;

// Riot Data Dragon
const PATCH_VERSION = '9.17.1';
const DATA_DRAGON = `http://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}`;

// Use static content generated from build
app.use(express.static(join(__dirname, '../build')));

// Parse application/json
app.use(json());

// Test GET request
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Search for a Summoner's profile
app.post('/search', (req, res) => {
  let query = API + encodeURI(req.body.user) + API_KEY;
  let profileIconId = null;
  let summonerName = null;
  axios.get(query)
    .then((response) => {
      const { data } = response;
      query = RANK_API + data.id + API_KEY;
      summonerName = data.name;
      profileIconId = data.profileIconId;
      return axios.get(query);
    })
    .then((response) => {
      const { data } = response;
      let returnObj = {};
      data.forEach((queue) => {
        if (queue.queueType === 'RANKED_SOLO_5x5') {
          returnObj = queue;
          returnObj.tierMedal = `http://opgg-static.akamaized.net/images/medals/${queue.tier.toLowerCase()}_${romanToInt(queue.rank)}.png`;
        }
      });
      returnObj.profileIcon = `http://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/profileicon/${profileIconId}.png`;
      returnObj.summonerName = summonerName;
      res.send(returnObj);
    })
    .catch(() => {
      res.send('Invalid Summoner!');
    });
});

// For deploying production buiild
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../build', 'index.html'));
});

// Listening feedback
app.listen(port, () => console.log(`Listening on port ${port}`));
