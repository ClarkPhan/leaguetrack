// Node Packages
import express from 'express';
import { json } from 'body-parser';
import { join } from 'path';
import axios from 'axios';
import {
  romanToInt,
  findChampion,
  findSummonerSpell,
  findQueue,
  timeDifference,
  convertToMinutes,
  findRune,
  getItemIcon,
} from './utils';

// Load API Key
require('dotenv').config();

// Express
const app = express();
const port = process.env.PORT || 3001;

// API
const API = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
const RANK = 'https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/';
const MATCH_LIST = 'https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/';
const MATCH = 'https://na1.api.riotgames.com/lol/match/v4/matches/';

const API_KEY = `?api_key=${process.env.API_KEY}`;
const CHAIN_API_KEY = `&api_key=${process.env.API_KEY}`;

// Riot Data Dragon
const PATCH_VERSION = '10.16.1';
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
  let summonerLevel = null;
  let encryptedAccountId = null;
  const matchHistory = {
    matches: {},
  };
  let returnObj = {};

  // Get Account Info
  axios.get(query)
    .then((response) => {
      const { data } = response;
      encryptedAccountId = data.accountId;
      query = RANK + data.id + API_KEY;
      summonerName = data.name;
      profileIconId = data.profileIconId;
      summonerLevel = data.summonerLevel;
      return axios.get(query);
    })
    .then((response) => {
      const { data } = response;
      query = `${MATCH_LIST + encryptedAccountId}?endIndex=5${CHAIN_API_KEY}`;
      // Filter for Solo/Duo queue
      data.forEach((queue) => {
        if (queue.queueType === 'RANKED_SOLO_5x5') {
          returnObj = queue;
          returnObj.winRatio = Math.round(
            (queue.wins / (queue.wins + queue.losses)).toPrecision(2) * 100,
          );
          returnObj.tierMedal = `http://opgg-static.akamaized.net/images/medals/${queue.tier.toLowerCase()}_${romanToInt(queue.rank)}.png`;
        }
      });
      returnObj.profileIcon = `http://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/profileicon/${profileIconId}.png`;
      returnObj.summonerName = summonerName;
      returnObj.summonerLevel = summonerLevel;
      return axios.get(query);
    })
    .then((response) => {
      const { data: { matches } } = response;
      const requests = [];
      matchHistory.matches = matches;
      matches.forEach((match, index) => {
        const champion = findChampion(match.champion);
        requests.push(axios.get(`${MATCH}${match.gameId}${API_KEY}`));
        matchHistory.matches[index].championIcon = `http://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/champion/${champion}.png`;
        if (champion === 'MonkeyKing') {
          matchHistory.matches[index].champion = 'Wukong';
        } else if (champion === 'LeeSin') {
          matchHistory.matches[index].champion = 'Lee Sin';
        } else if (champion === 'DrMundo') {
          matchHistory.matches[index].champion = 'Dr. Mundo';
        } else if (champion === 'MissFortune') {
          matchHistory.matches[index].champion = 'Miss Fortune';
        } else if (champion === 'AurelionSol') {
          matchHistory.matches[index].champion = 'Aurelion Sol';
        } else {
          matchHistory.matches[index].champion = champion;
        }
      });
      return axios.all(requests);
    })
    .then((responses) => {
      responses.forEach((response, index) => {
        const { data } = response;
        data.participantIdentities.forEach((participant, participantIndex) => {
          if (participant.player.summonerName === returnObj.summonerName) {
            const matchData = {
              win: data.participants[participantIndex].stats.win,
              kills: data.participants[participantIndex].stats.kills,
              deaths: data.participants[participantIndex].stats.deaths,
              assists: data.participants[participantIndex].stats.assists,
              doubleKills: data.participants[participantIndex].stats.doubleKills,
              tripleKills: data.participants[participantIndex].stats.tripleKills,
              quadraKills: data.participants[participantIndex].stats.quadraKills,
              pentaKills: data.participants[participantIndex].stats.pentaKills,
              item0: getItemIcon(PATCH_VERSION, data.participants[participantIndex].stats.item0),
              item1: getItemIcon(PATCH_VERSION, data.participants[participantIndex].stats.item1),
              item2: getItemIcon(PATCH_VERSION, data.participants[participantIndex].stats.item2),
              item3: getItemIcon(PATCH_VERSION, data.participants[participantIndex].stats.item3),
              item4: getItemIcon(PATCH_VERSION, data.participants[participantIndex].stats.item4),
              item5: getItemIcon(PATCH_VERSION, data.participants[participantIndex].stats.item5),
              item6: getItemIcon(PATCH_VERSION, data.participants[participantIndex].stats.item6),
              spell1: `http://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/spell/${findSummonerSpell(data.participants[participantIndex].spell1Id)}.png`,
              spell2: `http://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}/img/spell/${findSummonerSpell(data.participants[participantIndex].spell2Id)}.png`,
              rune1: `http://ddragon.leagueoflegends.com/cdn/img/${findRune(data.participants[participantIndex].stats.perkPrimaryStyle, data.participants[participantIndex].stats.perk0)}`,
              rune2: `http://ddragon.leagueoflegends.com/cdn/img/${findRune(data.participants[participantIndex].stats.perkSubStyle, null)}`,
              queue: findQueue(data.queueId),
              gameCreation: timeDifference(data.gameCreation),
              gameDuration: convertToMinutes(data.gameDuration),
            };
            matchHistory.matches[index] = { ...matchHistory.matches[index], ...matchData };
          }
        });
      });
      returnObj.matchHistory = matchHistory;
      console.log(returnObj);
      // console.log(matchHistory);
      res.send(returnObj);
    })
    .catch((error) => {
      console.log(error);
      res.send('Invalid Summoner!');
    });
});

// For deploying production buiild
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../build', 'index.html'));
});

// Listening feedback
app.listen(port, () => console.log(`Listening on port ${port}`));
