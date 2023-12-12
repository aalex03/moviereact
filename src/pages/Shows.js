import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';

import ShowCard from '../components/ShowCard';

function Shows({db}) {
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
      <div>
      {shows.map(s => (
        <ShowCard key={s.Title} show={s} />
      ))}
      </div>
    </div>
  );
}

export default Shows;
