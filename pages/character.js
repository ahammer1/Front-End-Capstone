import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getCharacters } from '../api/CharacterData';
import { useAuth } from '../utils/context/authContext';
import CharacterCard from '../components/CharacterCard';

function CharacterHome() {
  const [characters, setCharacters] = useState([]);

  const { user } = useAuth();

  const getAllCharacters = () => {
    getCharacters(user.uid).then(setCharacters);
  };

  useEffect(() => {
    getAllCharacters();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/character/new" passHref>
        <Button>Add A Character</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {characters.map((character) => (
          <CharacterCard key={character.firebaseKey} characterObj={character} onUpdate={getAllCharacters} />
        ))}
      </div>

    </div>
  );
}

export default CharacterHome;
