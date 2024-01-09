import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditReviewModal = ({ show, onClose, review, onUpdate }) => {
  const [editedReview, setEditedReview] = useState({ ...review });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // You can add validation or other logic before updating the review
    onUpdate(editedReview);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formContent">
            <Form.Label>Review Content</Form.Label>
            <Form.Control
              type="text"
              name="Content"
              value={editedReview.Content}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              name="Rating"
              value={editedReview.Rating}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditReviewModal;
