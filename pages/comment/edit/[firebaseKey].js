import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleComment } from '../../../api/commentData';
import CommentForm from '../../../components/commentForm';

export default function Editcomment() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleComment(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<CommentForm obj={editItem} />);
}
