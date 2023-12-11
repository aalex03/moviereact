import logo from './logo.svg';
import './App.css';
import {Route, NavLink, HashRouter} from 'react-router-dom';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import NavigationBar from './components/NavigationBar';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
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
  initializeApp(firebaseConfig)
  const auth = getAuth();
  const db = getFirestore();
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <NavigationBar user={user} />
      </header>
    </div>
  );
}

export default App;
