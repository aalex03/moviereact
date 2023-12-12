import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import NavigationBar from './components/NavigationBar';
import Shows from './pages/Shows';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyBUyDhtWkPCPoNahE6U8apjziVWRSkkGRU",
  authDomain: "mymovielist-2ebef.firebaseapp.com",
  projectId: "mymovielist-2ebef",
  storageBucket: "mymovielist-2ebef.appspot.com",
  messagingSenderId: "463710500610",
  appId: "1:463710500610:web:db3c2421f822c0dfd4f41b"
};


function App() {
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <NavigationBar user={user} />
          <Routes>
            <Route path="/shows" element={<Shows db={firestore} />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
