import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebaseApp';
import ReviewForm from './ReviewForm';
import ReviewCard from './ReviewCard';
import { Button } from 'react-bootstrap';
import EditReviewModal from './EditReviewModal'; // Import the EditReviewModal component

const Review = ({ showId }) => {
  const [currentUser] = useAuthState(auth);
  const [userReview, setUserReview] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserReview = async () => {
      if (currentUser) {
        const q = query(
          collection(db, 'reviews'),
          where('ShowId', '==', showId),
          where('UserId', '==', currentUser.uid)
        );
        const userReviewDocs = await getDocs(q);

        if (userReviewDocs.docs.length > 0) {
          // User has a review for the show
          setUserReview(userReviewDocs.docs[0].data());
        } else {
          // No review found, you can handle this case as needed
          setUserReview(null);
        }
      }
    };

    fetchUserReview();
  }, [showId, currentUser]);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateReview = (updatedReview) => {
    // Implement the logic to update the review in Firestore
    console.log('Updated Review:', updatedReview);
    setUserReview(updatedReview);
    // Close the modal after saving changes
    closeEditModal();
  };

  return (
    <div>


      {userReview ? (
        // User has a review, display the review content
        <div>
          <ReviewCard review={userReview} />
          <Button variant="outline-primary" onClick={openEditModal}>
            Edit Review
          </Button>
          <EditReviewModal
            show={isEditModalOpen}
            onClose={closeEditModal}
            review={userReview}
            onUpdate={handleUpdateReview}
          />
        </div>
      ) : (
        // User does not have a review, render the ReviewForm
        <ReviewForm showId={showId} />
      )}
    </div>
  );
};

export default Review;
