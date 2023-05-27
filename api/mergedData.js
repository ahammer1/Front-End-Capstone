import { getCharacterGames, getSingleCharacter } from './CharacterData';

const viewCharacterDetails = (characterFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleCharacter(characterFirebaseKey), getCharacterGames(characterFirebaseKey)])
    .then(([characterObject, characterGamesArray]) => {
      resolve({ ...characterObject, games: characterGamesArray });
    }).catch((error) => reject(error));
});

export default viewCharacterDetails;
