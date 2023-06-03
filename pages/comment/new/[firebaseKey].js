import { useRouter } from 'next/router';
import React from 'react';
import CommentForm from '../../../components/commentForm';

export default function AddComment() {
  const router = useRouter();

  const { firebaseKey } = router.query;
  return <CommentForm characterId={firebaseKey} />;
}
