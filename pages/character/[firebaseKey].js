import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Stack } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CommentCard from '../../components/commentCard';
import { viewCharacterDetails } from '../../api/mergedData';

export default function ViewCharacter() {
  const [characterDetails, setCharacterDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewCharacterDetails(firebaseKey).then(setCharacterDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="text-center">
        <Link href={`/comment/new/${characterDetails.firebaseKey}`} passHref>
          <Button variant="dark">Add A Recap</Button>
        </Link>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'auto',
      }}
      >
        <div className="text-white ms-5 details">
          <Card.Img src={characterDetails.image} alt={characterDetails.character_name} style={{ width: '300px' }} />
          <h5>{characterDetails.character_name}</h5>
        </div>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
      >
        <div className="d-flex flex-wrap">
          <Stack gap={3}>
            {characterDetails?.comments?.map((comment) => (
              <CommentCard key={Comment.firebaseKey} commentObj={comment} />
            ))}
          </Stack>
        </div>
      </div>
    </>
  );
}
