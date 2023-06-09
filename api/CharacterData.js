import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getCharacters = (gameId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/characters.json?orderBy="gameId"&equalTo="${gameId}"`, {
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

const createCharacter = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/characters.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const getSingleCharacter = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/characters/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

const deleteSingleCharacter = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/characters/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateCharacter = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/characters/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getCharacterGames = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/characters.json?orderBy="game_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getCharacters,
  createCharacter,
  getSingleCharacter,
  deleteSingleCharacter,
  updateCharacter,
  getCharacterGames,
};
