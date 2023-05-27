/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getGames } from '../api/gameData';
import { useAuth } from '../utils/context/authContext';
import GameCard from '../components/GameCard';

function Home() {
  const [games, setGames] = useState([]);

  const { user } = useAuth();

  const getAllTheGames = () => {
    getGames(user.uid).then(setGames);
  };

  useEffect(() => {
    getAllTheGames();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/Game/newGame" passHref>
        <Button>Add A Game</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {games.map((game) => (
          <GameCard key={game.firebaseKey} gameObj={game} onUpdate={getAllTheGames} />
        ))}
      </div>

    </div>
  );
}

export default Home;
