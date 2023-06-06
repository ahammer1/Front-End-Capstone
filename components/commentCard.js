import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Link from 'next/link';

function CommentCard({ commentObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{commentObj.character_level}</Card.Title>
        <Card.Text>
          {commentObj.description}
        </Card.Text>
        <Link href={`/comment/edit/${commentObj.firebaseKey}`}>Edit</Link>
      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    character_level: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default CommentCard;
