import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleCharacter } from '../api/CharacterData';
// import { viewGameDetails } from '../api/mergedData';

function CharacterCard({ characterObj, onUpdate }) {
  const deleteThisCharacter = () => {
    if (window.confirm(`Delete ${characterObj.character_name} ?`)) {
      deleteSingleCharacter(characterObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={characterObj.image} alt={characterObj.character_name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{characterObj.character_name}</Card.Title>
        <Link href={`/character/${characterObj.firebaseKey}`} passHref>
          <Button variant="dark" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/character/edit/${characterObj.firebaseKey}`} passHref>
          <Button variant="dark">EDIT</Button>
        </Link>
        <Button variant="dark" onClick={deleteThisCharacter} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

CharacterCard.propTypes = {
  characterObj: PropTypes.shape({
    character_name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func,
};

CharacterCard.defaultProps = {
  onUpdate: () => {},
};

export default CharacterCard;
