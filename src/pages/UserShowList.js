import React, { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebaseApp';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import ShowCard from '../components/ShowCard';

const UserShowList = () => {
  const [currentUser] = useAuthState(auth);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserReviews = async () => {
      if (currentUser) {
        const userReviewsQuery = query(
          collection(db, 'reviews'),
          where('UserId', '==', currentUser.uid)
        );

        const userReviewsSnapshot = await getDocs(userReviewsQuery);
        const reviews = userReviewsSnapshot.docs.map((doc) => doc.data());

        // Fetch associated shows for each review
        const showsPromises = reviews.map(async (review) => {
          const showDoc = await getDoc(doc(db, 'shows', review.ShowId));
          return showDoc.data();
        });

        const shows = await Promise.all(showsPromises);

        // Combine reviews and shows
        const userReviewsWithShows = reviews.map((review, index) => ({
          ...review,
          show: shows[index],
        }));

        setUserReviews(userReviewsWithShows);
        setLoading(false);
      }
    };

    fetchUserReviews();
  }, [currentUser]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Your Show List</h2>
      {userReviews.length === 0 ? (
        <p>No reviews yet. Start exploring and leave some reviews!</p>
      ) : (
        <div>
            <Stack direction='horizontal' gap={3}>
          {userReviews.map((review) => (
            <ShowCard key={review.ShowId} show={review.show} />
          ))}
            </Stack>
        </div>
      )}
    </div>
  );
};

export default UserShowList;
