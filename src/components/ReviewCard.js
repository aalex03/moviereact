import React from 'react';
import { Card } from 'react-bootstrap';

const ReviewCard = ({ review }) => {
  return (
    <Card className='p-2 m-2'>
      <Card.Body>
        <Card.Title>Your Review</Card.Title>
        <Card.Text>{review.Content}</Card.Text>
        <Card.Text>Rating: {review.Rating}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
