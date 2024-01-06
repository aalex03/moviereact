import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'; // Assuming you're using react-bootstrap components
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseApp';

const ProfileSetup = () => {
  const [user] = useAuthState(auth);
  const [newUsername, setNewUsername] = useState('');

  const handleSave = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName: newUsername });
      // Redirect to the main application or perform any necessary action
    } catch (error) {
      console.error('Error updating username:', error.message);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="container">
      <h2>Set Up Your Profile</h2>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Form>
    </div>
  );
};

export default ProfileSetup;