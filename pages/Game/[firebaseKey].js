// this page will route to characters associated with this game
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getSingleGame } from '../../api/gameData';
import { getSingleCharacter } from '../../api/CharacterData';
// import CharacterCard from '../../components/CharacterCard';

export default function ViewGame() {
  const [gameDetails, setGameDetails] = useState({});
  const [characterDetails, setCharacterDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleGame(firebaseKey).then(setGameDetails);
  }, [firebaseKey]);

  useEffect(() => {
    getSingleCharacter(firebaseKey).then(setCharacterDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <Link href="/character/new" passHref>
          <Button>Add A Character</Button>
        </Link>
        <div className="text-white ms-5 details">
          <h className="card-title bold">{gameDetails.title}</h>
          <Image img src={gameDetails.img} alt={gameDetails.title} style={{ width: '300px' }} />
          <p className="card-text bold">{gameDetails.genre}</p>
          <p className="card-text bold">{gameDetails.console}</p>
          <p className="card-text bold">{gameDetails.description}</p>
        </div>
      </div>
      <div className="mt-5 d-flex flex-wrap">
        <div className="text-white ms-5 details">
          <Image img src={characterDetails.image} alt={characterDetails.title} style={{ width: '300px' }} />
          <h5>
            {characterDetails.character_name}
          </h5>
        </div>
      </div>
    </>
  );
}
