// this page will route to characters associated with this game
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import CharacterCard from '../../components/CharacterCard';
import viewGameDetails from '../../api/mergedData';

export default function ViewGame() {
  const [gameDetails, setGameDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewGameDetails(firebaseKey).then(setGameDetails);
  }, [firebaseKey]);

  // console.warn({ gameDetails });

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <Link href={`/character/new/${gameDetails.firebaseKey}`} passHref>
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
      <div className="d-flex flex-wrap">
        {gameDetails?.characters?.map((character) => (
          <CharacterCard key={character.firebaseKey} characterObj={character} />
        ))}
      </div>
    </>
  );
}
