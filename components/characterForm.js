import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { propTypes } from 'react-bootstrap/esm/Image';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../utils/context/authContext';
import { createCharacter, updateCharacter } from '../api/CharacterData';

const initialState = {
  character_name: '',
  image: '',
};
function CharacterForm({ gameId, obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateCharacter(formInput)
      // route to character..?
        .then(() => router.push(`/character/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid, game_id: gameId };
      createCharacter(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateCharacter(patchPayload).then(() => {
          router.push(`/game/${gameId}`);
        });
      });
    }
  };

  return (
    <Form className="text-white-50" onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Character</h2>

      <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label>Character Name</Form.Label>
        <Form.Control
          type="text"
          value={formInput.first_name}
          placeholder="Character Name"
          name="character_name"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <FloatingLabel controlId="floatingInput2" label="Book Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CharacterForm;

CharacterForm.propTypes = {
  gameId: propTypes.string,
  obj: PropTypes.shape({
    character_name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

CharacterForm.defaultProps = {
  obj: initialState,
  gameId: '',
};
