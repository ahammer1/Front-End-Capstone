import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createGame, updateGame } from '../api/gameData';

const initialState = {
  description: '',
  image: '',
  console: '',
  genre: '',
  title: '',
};

function GameForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateGame(formInput)
        .then(() => router.push(`/Game/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createGame(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateGame(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Game</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Game Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Game Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Last Name INPUT  */}
      <Form.Group className="mb-3" controlId="formGenre">
        <Form.Control
          type="text"
          placeholder="Genre"
          value={formInput.genre}
          name="genre"
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Console" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a console"
          name="console"
          value={formInput.console}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Game</Button>
    </Form>
  );
}

GameForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    genre: PropTypes.string,
    console: PropTypes.string,
    title: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

GameForm.defaultProps = {
  obj: initialState,
};

export default GameForm;
