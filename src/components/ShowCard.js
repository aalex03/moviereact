import React from 'react';
import Card from 'react-bootstrap/Card';

function ShowCard({ show }) {
    const releaseDate = new Date(show.ReleaseDate);
  return (
    <Card style={{ width: '18rem' }}>
      
      <Card.Body>
        <Card.Title>{show.Title}</Card.Title>
        <Card.Img variant="top" src={show.Poster} />
        
        <Card.Text style={{ fontSize: 'small', overflowY: 'auto', maxHeight: '100px' }}>
          {show.Synopsis}
        </Card.Text>
      </Card.Body>
      <Card.Footer className='d-flex' style={{fontSize: "0.75rem", padding: "10px"}}>
        <small className="text-muted">{show.Genre}</small>
        <small className="text-muted ms-auto">{show.ReleaseDate.toDate().toLocaleDateString()}</small>
      </Card.Footer>
    </Card>
  );
}

export default ShowCard;