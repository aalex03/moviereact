import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {db} from "../firebaseApp";
const CommentForm = ({ showId }) => {
  const [content, setContent] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('Please enter a comment');
      return;
    }

    try {
      const commentsRef = collection(db, 'comments');

      await addDoc(commentsRef, {
        userId: 'currentUserId', // Replace with actual user ID
        showId,
        content,
        timestamp: serverTimestamp(),
      });

      // Clear the input field after submission
      setContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <Form onSubmit={handleCommentSubmit}>
      <Form.Group controlId="formComment">
        <Form.Label>Your Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter your comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Comment
      </Button>
    </Form>
  );
};

export default CommentForm;
