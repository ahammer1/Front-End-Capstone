import { useRouter } from 'next/router';
import React from 'react';
import CharacterForm from '../../../components/characterForm';

export default function AddCharacter() {
  const router = useRouter();

  const { firebaseKey } = router.query;
  return <CharacterForm gameId={firebaseKey} />;
}
