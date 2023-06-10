// this page will route to characters associated with this game
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { Button, Stack } from 'react-bootstrap';
import { useRouter } from 'next/router';
import CharacterCard from '../../components/CharacterCard';
import { viewGameDetails } from '../../api/mergedData';

export default function ViewGame() {
  const [gameDetails, setGameDetails] = useState({});

  const router = useRouter();

  const { firebaseKey } = router.query;

  const onUpdate = () => {
    viewGameDetails(firebaseKey).then(setGameDetails);
  };

  useEffect(() => {
    viewGameDetails(firebaseKey).then(setGameDetails);
  }, [firebaseKey]);
  return (
    <>
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',
      }}
      >
        <div className="text-center">
          <Link href={`/character/new/${gameDetails.firebaseKey}`} passHref>
            <Button variant="dark">Add A Character</Button>
          </Link>
          <div className="text-white mt-5 details">
            <h2 className="card-title bold">{gameDetails.title}</h2>
            <Card.Img src={gameDetails.image} alt={gameDetails.title} style={{ width: '300px' }} />
            <p className="card-text bold">{gameDetails.genre}</p>
            <p className="card-text bold">{gameDetails.console}</p>
            <p className="card-text bold">{gameDetails.description}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <Stack gap={3}>
          {gameDetails?.characters?.map((character) => (
            <CharacterCard key={character.firebaseKey} characterObj={character} onUpdate={onUpdate} />
          ))}
        </Stack>
      </div>
    </>
  );
}
