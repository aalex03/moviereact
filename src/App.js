import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import app from './firebaseApp';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


import NavigationBar from './components/NavigationBar';
import Shows from './pages/Shows';
import UserShowList from './pages/UserShowList';
import ShowPage from './pages/ShowPage';



function App() {
  
  const auth = getAuth(app);
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <NavigationBar user={user} />
          <Routes>
            <Route path="/shows" element={<Shows/>} />
            <Route path="/showlist" element={<UserShowList/>} />
            <Route path="/showpage/:title" element={<ShowPage/>} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
