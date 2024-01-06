import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseApp';
import { useAuthState } from 'react-firebase-hooks/auth';



import NavigationBar from './components/NavigationBar';
import Shows from './pages/Shows';
import UserShowList from './pages/UserShowList';
import ShowPage from './pages/ShowPage';
import ProfileSetup from './components/ProfileSetup';

function App() {
  
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <NavigationBar user={user} />
          <Routes>
            <Route path="/" element={<Shows/>} />
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
