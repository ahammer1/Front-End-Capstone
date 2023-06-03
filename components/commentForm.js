import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { propTypes } from 'react-bootstrap/esm/Image';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { createComment, updateComment } from '../api/commentData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  character_level: '',
  description: '',
};
function CommentForm({ characterId, obj }) {
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
      updateComment(formInput)
      // route to comment..?
        .then(() => router.push(`/character/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid, character_id: characterId };
      createComment(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateComment(patchPayload).then(() => {
          router.push(`/character/${characterId}`);
        });
      });
    }
  };

  return (
    <Form className="text-white-50" onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Comment</h2>

      <Form.Group className="mb-3" controlId="formCharacterLevel">
        <Form.Label>Character Level</Form.Label>
        <Form.Control
          type="text"
          value={formInput.character_level}
          placeholder="Character Level"
          name="character_level"
          onChange={handleChange}
          required
        />
      </Form.Group>

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

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

CommentForm.propTypes = {
  characterId: propTypes.string,
  obj: PropTypes.shape({
    character_level: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

CommentForm.defaultProps = {
  obj: initialState,
  characterId: '',
};

export default CommentForm;
