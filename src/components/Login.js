import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from 'react-bootstrap';

function Login() {
  const signInWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant='primary' onClick={signInWithGoogle}>Sign in with Google</Button>
  );
}

export default Login;