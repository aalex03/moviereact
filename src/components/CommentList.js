import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Alert } from 'react-bootstrap';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebaseApp';
import Comment from './Comment';

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

  const [comments] = useCollectionData(commentsQuery, { idField: 'id' }) ?? [];

  if (!!comments && comments.length === 0) {
    return (
      <div>
        No comments added.
      </div>
  
    )
  }

  return (
    <div>
      <ListGroup>
        {
          !!comments && (
            comments.map((comment) => <Comment key={comment.id} comment={comment} />)
          )
        }
        <div className="d-flex justify-content-center mt-3">
              <Button
                variant="outline-primary"
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Load More
              </Button>
            </div>
      </ListGroup>
    </div>
  );
  
};

export default CommentList;