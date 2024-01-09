import React from 'react';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import {getStorage, ref, getDownloadURL} from 'firebase/storage';
import app from '../firebaseApp';

function ShowCard({ show }) {
  const storage = getStorage(app);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const imageRef = ref(storage, show.PosterURL);

    getDownloadURL(imageRef)
      .then(url =>{console.log(url); setImageUrl(url)})
      .catch(error => console.error('Error getting download URL:', error));
  }, [show.PosterURL, storage]);

  return (
    <Card style={{minWidth:'18rem', maxWidth: '18rem', backgroundColor: '#1d2026',minHeight : '27vw', maxHeight: '27vw' }}>
      
      <Card.Body>
        <Card.Title className='text-light'>{show.Title}</Card.Title>
        <Card.Img variant="top" style={{maxWidth: "100%", height: '15vw' }} src={imageUrl} />

        
        <Card.Text className='mt-2' style={{ fontSize: 'small', overflowY: 'auto', maxHeight: '100px', color: 'white' }}>
          {show.Synopsis}
        </Card.Text>
      </Card.Body>
      <Card.Footer className='d-flex' style={{fontSize: "0.75rem", padding: "10px"}}>
        <small className= 'text-light'>{show.Genre}</small>
        <small className="text-light ms-auto">{show.ReleaseDate.toDate().toLocaleDateString()}</small>
      </Card.Footer>
    </Card>
  );
}

export default ShowCard;