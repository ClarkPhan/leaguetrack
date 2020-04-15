const champions = require('./champion.json');
const summonerSpells = require('./summoner.json');

// Helper function to print data in console
export const printData = (data) => console.log(JSON.stringify(data, null, 2));

// Helper function to convert roman numerals into integers
export const romanToInt = (num) => {
  const roman = ['I', 'II', 'III', 'IV'];
  const value = ['1', '2', '3', '4'];
  for (let i = 0; i < roman.length; i += 1) {
    if (roman[i] === num) {
      return value[i].toString();
    }
  }
  return 'error';
};

export const findChampion = (id) => {
  const { data } = champions;
  let champ = null;
  Object.keys(data).forEach((champion) => {
    if (parseInt(data[champion].key, 10) === id) {
      champ = champion;
    }
  });
  return champ;
};


export const findSummonerSpell = (id) => {
  const { data } = summonerSpells;
  let spell = null;
  Object.keys(data).forEach((summonerSpell) => {
    if (parseInt(data[summonerSpell].key, 10) === id) {
      spell = summonerSpell;
    }
  });
  return spell;
};

export const findQueue = (id) => {
  switch (id) {
    case 400:
      return 'Normal Draft';
    case 420:
      return 'Ranked Solo';
    case 430:
      return 'Normal Blind';
    case 440:
      return 'Ranked Flex';
    case 450:
      return 'ARAM';
    case 460:
      return 'Twisted Normal';
    case 470:
      return 'Twisted Flex';
    case 700:
      return 'Clash';
    case 1020:
      return 'One for All';
    default:
      return null;
  }
};


export const timeDifference = (previous) => {
  const currentTime = new Date();
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = currentTime.getTime() - previous;
  let computed = 0;
  if (elapsed < msPerMinute) {
    computed = Math.round(elapsed / 1000);
    return `${computed === 1 ? `${computed} second ` : `${computed} seconds `} ago`;
  }
  if (elapsed < msPerHour) {
    computed = Math.round(elapsed / msPerMinute);
    return `${computed === 1 ? `${computed} minute ` : `${computed} minutes `} ago`;
  }
  if (elapsed < msPerDay) {
    computed = Math.round(elapsed / msPerHour);
    return `${computed === 1 ? `${computed} hour ` : `${computed} hours `} ago`;
  }
  if (elapsed < msPerMonth) {
    computed = Math.round(elapsed / msPerDay);
    return `${computed === 1 ? `${computed} day ` : `${computed} days `} ago`;
  }
  if (elapsed < msPerYear) {
    computed = Math.round(elapsed / msPerMonth);
    return `${computed === 1 ? `${computed} month ` : `${computed} months `} ago`;
  }
  computed = Math.round(elapsed / msPerYear);
  return `${computed === 1 ? `${computed} year ` : `${computed} years `} ago`;
};

export const convertToMinutes = (seconds) => (`${Math.round(seconds / 60)}m  ${seconds % 60}s`);
