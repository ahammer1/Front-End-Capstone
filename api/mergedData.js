import { getCharacterGames, getSingleCharacter } from './CharacterData';
import { getCommentCharacters } from './commentData';
import { getSingleGame } from './gameData';

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

export { viewGameDetails, viewCharacterDetails };
