import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import viewCharacterDetails from '../../api/mergedData';

export default function ViewCharacter() {
  const [characterDetails, setCharacterDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewCharacterDetails(firebaseKey).then(setCharacterDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <img src={characterDetails.image} alt={characterDetails.title} style={{ width: '300px' }} />
        <h5>
          {characterDetails.character_name}
        </h5>
      </div>
    </div>
  );
}
