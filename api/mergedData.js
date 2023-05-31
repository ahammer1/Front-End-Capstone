import { getCharacterGames } from './CharacterData';
import { getSingleGame } from './gameData';

const viewGameDetails = (gamesFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleGame(gamesFirebaseKey), getCharacterGames(gamesFirebaseKey)])
    .then(([gameObject, characterGamesArray]) => {
      resolve({ ...gameObject, characters: characterGamesArray });
    }).catch((error) => reject(error));
});

export default viewGameDetails;
