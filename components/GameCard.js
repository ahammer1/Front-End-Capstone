import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Link from 'next/link';
import { deleteGame } from '../api/gameData';

function GameCard({ gameObj, onUpdate }) {
  const deleteThisGame = () => {
    if (window.confirm(`Delete ${gameObj.title}?`)) {
      deleteGame(gameObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card
      className="hoverable-card"
      style={{ width: '18rem', margin: '10px' }}
    >
      <Card.Img
        variant="top"
        src={gameObj.image}
        alt={gameObj.title}
        style={{ height: '300px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title style={{ textAlign: 'center', marginBottom: '10px' }}>
          {gameObj.title}
        </Card.Title>
        <p className="card-text bold" style={{ marginBottom: '5px' }}>
          {gameObj.genre}
        </p>
        <p className="card-text bold" style={{ marginBottom: '5px' }}>
          {gameObj.console}
        </p>
        <p className="card-text" style={{ marginBottom: '15px' }}>
          {gameObj.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="dark" className="mr-2" href={`/Game/${gameObj.firebaseKey}`}>
            VIEW
          </Button>
          <Button variant="dark" className="mr-2" href={`/Game/Edit/${gameObj.firebaseKey}`}>
            EDIT
          </Button>
          <Button variant="dark" onClick={deleteThisGame}>
            DELETE
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

GameCard.propTypes = {
  gameObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    genre: PropTypes.string,
    console: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
