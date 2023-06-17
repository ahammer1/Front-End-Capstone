import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Link from 'next/link';

function CommentCard({ commentObj }) {
  return (
    <Card style={{
      width: '50rem', display: 'flex', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}
    >
      <Card.Body>
        <Card.Title style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>{commentObj.character_level}</Card.Title>
        <Card.Text style={{ fontSize: '14px', marginBottom: '15px' }}>
          {commentObj.description}
        </Card.Text>
        <Link href={`/comment/edit/${commentObj.firebaseKey}`} style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Edit</Link>
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
