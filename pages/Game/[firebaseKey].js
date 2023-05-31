// this page will route to characters associated with this game
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getSingleGame } from '../../api/gameData';
// import CharacterCard from '../../components/CharacterCard';
// import { getCharacters } from '../../api/CharacterData';
// import { useAuth } from '../../utils/context/authContext';
import { getCharacterGames } from '../../api/CharacterData';
import CharacterCard from '../../components/CharacterCard';
// import viewCharacterDetails from '../../api/mergedData';
// import { getSingleCharacter } from '../../api/CharacterData';
// import CharacterCard from '../../components/CharacterCard';

export default function ViewGame() {
  const [gameDetails, setGameDetails] = useState({});
  const [characters, setCharacter] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleGame(firebaseKey).then(setGameDetails);
  }, [firebaseKey]);

  useEffect(() => {
    getCharacterGames(firebaseKey).then(setCharacter);
  }, [firebaseKey]);

  console.warn({ gameDetails });

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <Link href="/character/new" passHref>
          <Button>Add A Character</Button>
        </Link>
        <div className="text-white ms-5 details">
          <h2 className="card-title bold">{gameDetails.title}</h2>
          <Card.Img src={gameDetails.image} alt={gameDetails.title} style={{ width: '300px' }} />
          <p className="card-text bold">{gameDetails.genre}</p>
          <p className="card-text bold">{gameDetails.console}</p>
          <p className="card-text bold">{gameDetails.description}</p>
        </div>
      </div>
      {/* <div className="mt-5 d-flex flex-wrap">
        <div className="text-white ms-5 details">
          <Card.Img src={characterDetails.image} alt={characterDetails.title} style={{ width: '300px' }} />
          <h5>
            {characterDetails.character_name}
          </h5>
        </div>
      </div> */}
      <div className="d-flex flex-wrap">
        {characters.map((character) => (
          <CharacterCard key={character.firebaseKey} characterObj={character} />
        ))}
      </div>
    </>
  );
}

// function CharacterHome() {
//   const [characters, setCharacters] = useState([]);

//   const { user } = useAuth ();

//   const getAllCharacters = () => {
//     getCharacters(user.uid).then(setCharacters);
//   };

//   useEffect(() => {
//     getAllCharacters();
//   }, []);

//   return (
//     <div className="text-center my-4">
//       <Link href="/character/new" passHref>
//         <Button>Add A Character</Button>
//       </Link>
//       <div className="d-flex flex-wrap">
//         {characters.map((character) => (
//           <CharacterCard key={character.firebaseKey} characterObj={character} onUpdate={getAllCharacters} />
//         ))}
//       </div>

//     </div>
//   );
// }

// export default CharacterHome;
