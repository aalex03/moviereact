import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseApp';
import { Rating } from 'react-simple-star-rating'

const ReviewForm = ({ showId }) => {
  const [rating, setRating] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      // Handle the case where the user is not logged in
      setError('Please log in to leave a review.');
      return;
    }

    // Construct the review data
    const reviewData = {
      ShowId: showId,
      UserId: auth.currentUser.uid,
      Rating: rating,
      Content: content,
      Timestamp: new Date(),
    };

    try {
      setSubmitting(true);

      // Check if the user has already left a review for the show
      const userReviewRef = doc(db, 'reviews', `${showId}_${auth.currentUser.uid}`);
      const userReviewDoc = await getDoc(userReviewRef);

      if (userReviewDoc.exists()) {
        // Update the existing review
        await setDoc(userReviewRef, reviewData);
      } else {
        // Add a new review
        await addDoc(collection(db, 'reviews'), reviewData);
      }

      setSuccess(true);
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Error submitting review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRating = (rate) => {
    setRating(rate)

    // other logic
  }

  return (
    <div>
      <h3>Leave a Review</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Review submitted successfully!</Alert>}
      {!success && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Rating
            onClick={handleRating}
            />
          </Form.Group>

          <Form.Group  controlId="content">
            <Form.Label>Review Content</Form.Label>
            <Form.Control 
            className="red-placeholder"
            style={{backgroundColor: '#1d2026', color:'white'}}
              as="textarea"
              rows={3}
              value={content}
              placeholder="Enter your review"
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={submitting}>
            Submit Review
          </Button>
        </Form>
      )}
    </div>
  );
};

export default ReviewForm;
