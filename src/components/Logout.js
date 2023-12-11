import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Button } from 'react-bootstrap';
function Logout() {
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant='primary' onClick={handleLogout}>Logout</Button>
  );
}

export default Logout;