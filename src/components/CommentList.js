import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Alert } from 'react-bootstrap';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebaseApp';
const CommentList = ({ showId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 8;
  const commentsRef = collection(db, 'comments');
  const commentsQuery = query(
    commentsRef,
    where('ShowId', '==', showId),
    orderBy('Timestamp', 'desc'),
    limit(commentsPerPage * currentPage)
  );
  
  const [comments, loading, error] = useCollectionData(commentsQuery, { idField: 'id' });

  useEffect(() => {
    // This effect will be triggered when currentPage or showId changes
    // You can still use it to fetch additional data or perform other actions if needed
  }, [currentPage, showId]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading indicator
  }

  if (error) {
    console.error('Error fetching comments:', error);
    return <p>Error loading comments</p>;
  }

  return (
    <div>
      <h2>Comments</h2>
      {comments && comments.length === 0 ? (
        <Alert variant="info">No comments yet. Be the first to leave one!</Alert>
      ) : (
        <ListGroup>
          {comments &&
            comments.map((comment) => (
              <ListGroup.Item key={comment.id}>{comment.Content}</ListGroup.Item>
            ))}
        </ListGroup>
      )}

      {comments && comments.length >= commentsPerPage && (
        <Button variant="primary" onClick={handleLoadMore}>
          Load More
        </Button>
      )}
    </div>
  );
};

export default CommentList;