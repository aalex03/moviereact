import React from 'react';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, Route } from 'react-router-dom';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import app from '../firebaseApp';

import ShowPage from '../pages/ShowPage';

function ShowCard({ show }) {
  const storage = getStorage(app);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const imageRef = ref(storage, show.PosterURL);

    getDownloadURL(imageRef)
      .then(url => { console.log(url); setImageUrl(url) })
      .catch(error => console.error('Error getting download URL:', error));
  }, [show.PosterURL, storage]);

  return (
    <Card style={{ width: '18rem' }}>

      <Card.Body>
        <Link to={`/showpage/${show.Title}`}>
          <Card.Title>{show.Title}</Card.Title>
          <Card.Img variant="top" style={{ maxWidth: "100%" }} src={imageUrl} />
        </Link>

        <Card.Text style={{ fontSize: 'small', overflowY: 'auto', maxHeight: '100px' }}>
          {show.Synopsis}
        </Card.Text>
      </Card.Body>
      <Card.Footer className='d-flex' style={{ fontSize: "0.75rem", padding: "10px" }}>
        <small className="text-muted">{show.Genre}</small>
        <small className="text-muted ms-auto">{show.ReleaseDate.toDate().toLocaleDateString()}</small>
      </Card.Footer>
    </Card>
  );
}

export default ShowCard;