import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/games.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const deleteGame = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/games/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleGame = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/games/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createGame = (gameObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/games.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameObj),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const updateGame = (gameObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/games/${gameObj.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameObj),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getGames,
  createGame,
  deleteGame,
  getSingleGame,
  updateGame,
};
