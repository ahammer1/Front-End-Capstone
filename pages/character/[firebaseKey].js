import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
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
      <div className="mt-5 d-flex flex-wrap">
        <Link href={`/comment/new/${characterDetails.firebaseKey}`} passHref>
          <Button>Add A Log</Button>
        </Link>
        <div className="mt-5 d-flex flex-wrap">
          <div className="text-white ms-5 details">
            <Card.Img src={characterDetails.image} alt={characterDetails.character_name} style={{ width: '300px' }} />
            <h5>
              {characterDetails.character_name}
            </h5>
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {characterDetails?.comments?.map((comment) => (
          <CommentCard key={Comment.firebaseKey} commentsObj={comment} />
        ))}
      </div>
    </>
  );
}
