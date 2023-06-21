import { getCharacterGames, getCharacters, getSingleCharacter } from './CharacterData';
import { getCommentCharacters } from './commentData';
import { getGames, getSingleGame } from './gameData';

const viewGameDetails = (gamesFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleGame(gamesFirebaseKey), getCharacterGames(gamesFirebaseKey)])
    .then(([gameObject, characterGamesArray]) => {
      resolve({ ...gameObject, characters: characterGamesArray });
    }).catch((error) => reject(error));
});

const viewCharacterDetails = (charactersFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleCharacter(charactersFirebaseKey), getCommentCharacters(charactersFirebaseKey)])
    .then(([characterObject, commentCharactersArray]) => {
      resolve({ ...characterObject, comments: commentCharactersArray });
    }).catch((error) => reject(error));
});

const globalSearch = (searchTerm) => new Promise((resolve, reject) => {
  Promise.all([getCharacters(), getGames()])
    .then(([characterArray, gameArray]) => {
      const filteredCharacter = characterArray.filter((character) => {
        if (character.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return character;
        }
        return '';
      }).map((filterCharacter) => {
        if (filterCharacter !== '') {
          return {
            title: filterCharacter.title,
            firebaseKey: filterCharacter.firebaseKey,
            type: 'character',
          };
        }
        return '';
      });

      const filteredGames = gameArray.filter((game) => {
        if (game.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          return game;
        }
        return '';
      }).map((filterGame) => {
        if (filterGame !== '') {
          return {
            title: filterGame.title,
            firebaseKey: filterGame.firebaseKey,
            type: 'game',
          };
        }
        return '';
      });

      resolve([...filteredCharacter, ...filteredGames]);
    }).catch((error) => reject(error));
});

export { viewGameDetails, viewCharacterDetails, globalSearch };
