import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleCharacter, getCharacters } from '../api/CharacterData';

function CharacterCard({ characterObj, onUpdate }) {
  const deleteThisCharacter = () => {
    if (window.confirm(`Delete ${characterObj.character_name} ?`)) {
      deleteSingleCharacter(characterObj.firebaseKey).then(() => onUpdate(getCharacters));
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={characterObj.image} alt={characterObj.character_name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{characterObj.character_name}</Card.Title>
        <Link href={`/character/${characterObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/character/edit/${characterObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisCharacter} className="m-2">
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
