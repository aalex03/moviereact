import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getFirestore, serverTimestamp, addDoc, collection, Timestamp} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebaseApp'; // Assuming you have your Firebase app configured

const ShowUploadForm = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [trailerURL, setTrailerURL] = useState('');
  const [posterFile, setPosterFile] = useState(null);
  const [posterURL, setPosterURL] = useState('');
  const [uploading, setUploading] = useState(false);

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    setPosterFile(file);
  };

  function createTimestamp(dateString) {
    const date = new Date(dateString);
    return Timestamp.fromDate(date);
  }

  const handleUpload = async () => {
    try {
      setUploading(true);

      const releaseTimestamp =createTimestamp(releaseDate);

      // Upload poster image to Firebase Storage
      const posterRef = ref(storage, `posters/${posterFile.name}`);
      await uploadBytes(posterRef, posterFile);

      // Get download URL of the uploaded image
      const posterURL = await getDownloadURL(posterRef);

      // Add show data to Firestore
      const showData = {
        Title : title,
        Genre : genre,
        Synopsis : synopsis,
        ReleaseDate : releaseTimestamp,
        UploadDate: serverTimestamp(),
        TrailerURL : trailerURL,
        PosterURL : posterURL,
      };

      // Add the show data to the "shows" collection in Firestore
      const showsCollection = collection(db, 'shows');
      await addDoc(showsCollection, showData);

      // Reset form fields and state
      setTitle('');
      setGenre('');
      setSynopsis('');
      setReleaseDate('');
      setTrailerURL('');
      setPosterFile(null);
      setPosterURL('');
    } catch (error) {
      console.error('Error during show upload:', error.message);
      // Handle upload error
    } finally {
      setUploading(false);
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="genre">
        <Form.Label>Genre</Form.Label>
        <Form.Control type="text" placeholder="Enter genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="synopsis">
        <Form.Label>Synopsis</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Enter synopsis" value={synopsis} onChange={(e) => setSynopsis(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="releaseDate">
        <Form.Label>Release Date</Form.Label>
        <Form.Control
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="trailerURL">
        <Form.Label>Trailer URL</Form.Label>
        <Form.Control type="text" placeholder="Enter trailer URL" value={trailerURL} onChange={(e) => setTrailerURL(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="posterFile">
        <Form.Label>Poster Image</Form.Label>
        <Form.Control type="file" onChange={handlePosterChange} />
      </Form.Group>

      <Button variant="primary" type="button" disabled={uploading} onClick={handleUpload}>
        {uploading ? 'Uploading...' : 'Upload Show'}
      </Button>
    </Form>
  );
};

export default ShowUploadForm;
