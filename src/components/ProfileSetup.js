import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {doc, setDoc } from 'firebase/firestore';
import {auth, db} from '../firebaseApp';
const ProfileSetup = () => {
  const [username, setUsername] = useState('');

  const handleProfileSetup = async () => {
    const user = auth.currentUser;

    if (user) {
      const profileRef = doc(db, 'profiles', user.uid);

      try {
        // Set profile data in the "profiles" collection
        await setDoc(profileRef, {
          username: username,
        });

        // Assume the profile setup is successful
        console.log('Profile setup successful!');
      } catch (error) {
        console.error('Error setting up profile:', error);
      }
    }
  };

  return (
    <div>
      <h2>Profile Setup</h2>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleProfileSetup}>
          Set Up Profile
        </Button>
      </Form>
    </div>
  );
};

export default ProfileSetup;
