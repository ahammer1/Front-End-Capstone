import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCharacter } from '../../../api/CharacterData';
import CharacterForm from '../../../components/characterForm';

export default function Editcharacter() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCharacter(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<CharacterForm obj={editItem} />);
}
