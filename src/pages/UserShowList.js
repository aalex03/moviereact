import React, { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebaseApp';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import ShowCard from '../components/ShowCard';

const UserShowList = () => {
  const [currentUser] = useAuthState(auth);
  const [followedShows, setFollowedShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowedShows = async () => {
      if (currentUser) {
        // Query follows collection for shows followed by the current user
        const followsQuery = query(
          collection(db, 'follows'),
          where('UserId', '==', currentUser.uid)
        );

        const followsSnapshot = await getDocs(followsQuery);
        const followedShowsPromises = followsSnapshot.docs.map(async (followDoc) => {
          const showId = followDoc.data().ShowId;
          const showDoc = await getDoc(doc(db, 'shows', showId));
          return showDoc.data();
        });

        const followedShowsData = await Promise.all(followedShowsPromises);

        setFollowedShows(followedShowsData);
        setLoading(false);
      }
    };

    fetchFollowedShows();
  }, [currentUser]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Your Followed Shows</h2>
      {followedShows.length === 0 ? (
        <p>No shows followed yet. Start following some shows!</p>
      ) : (
        <div>
          <Stack direction='horizontal' gap={3}>
            {followedShows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </Stack>
        </div>
      )}
    </div>
  );
};

export default UserShowList;
