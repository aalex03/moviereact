import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';

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
    <div>
      <h1 >Shows</h1>
      {shows.map(show => (
        <div key={show.id}>
          <h2>{show.title}</h2>
          <p>{show.genre}</p>
        </div>
      ))}
    </div>
  );
}

export default Shows;
