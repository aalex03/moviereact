import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { Stack } from 'react-bootstrap';

import ShowCard from '../components/ShowCard';
import { db } from '../firebaseApp';

function Shows() {
  const showsRef = collection(db, 'shows');
  const [shows, loading, error] = useCollectionData(showsRef, { idField: 'id' });
  // Loading state: Display a loading message or spinner
  if (loading) {
    return <p>Loading...</p>;
  }

  // Error state: Display an error message
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Data loaded successfully: Render the shows
  return (
    <div className='d-flex align-items-start' style={{flexDirection: 'column'}}>
      <Stack direction='horizontal' gap={3}>
      {shows.map(s => (
        <ShowCard key={s.Title} show={s} />
      ))}
      </Stack>
    </div>
  );
}

export default Shows;
