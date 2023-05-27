import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleGame } from '../../../api/gameData';
import GameForm from '../../../components/GameForm';

export default function EditGame() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleGame(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<GameForm obj={editItem} />);
}
