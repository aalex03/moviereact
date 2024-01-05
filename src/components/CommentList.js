import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Alert } from 'react-bootstrap';
import { collection, query, orderBy, limit, getDocs, where} from 'firebase/firestore';
import {db} from "../firebaseApp";
const CommentList = ({ showId }) => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(showId);
  const commentsPerPage = 8;

  useEffect(() => {
    const fetchComments = async () => {
      const commentsRef = collection(db, 'comments');

      // Query to get the latest comments for the specific show, paginated
      const commentsQuery = query(
        commentsRef,
        where('showId', '==', showId),
        orderBy('Timestamp'),
        limit(commentsPerPage * currentPage)
      );

      const commentsSnapshot = await getDocs(commentsQuery);

      const commentsData = commentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(commentsData);
    };

    fetchComments();
  }, [currentPage, showId]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      {comments.length === 0 ? (
        <Alert variant="info">No comments yet. Be the first to leave one!</Alert>
      ) : (
        <ListGroup>
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {comments.length >= commentsPerPage && (
        <Button variant="primary" onClick={handleLoadMore}>
          Load More
        </Button>
      )}
    </div>
  );
};

export default CommentList;
