import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Button } from 'react-bootstrap';
import {auth} from '../firebaseApp';
function Logout() {

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant='primary' onClick={handleLogout}>Logout</Button>
  );
}

export default Logout;