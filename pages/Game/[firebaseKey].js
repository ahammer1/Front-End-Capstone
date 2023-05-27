// this page will route to characters associated with this game
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleGame } from '../../api/gameData';

export default function ViewGame() {
  const [gameDetails, setGameDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getSingleGame(firebaseKey).then(setGameDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <p className="card-text bold">{gameDetails.genre}</p>
        <p className="card-text bold">{gameDetails.console}</p>
        <p className="card-text bold">{gameDetails.description}</p>
      </div>
    </div>
  );
}
