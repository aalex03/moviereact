import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData, useDocument } from 'react-firebase-hooks/firestore';



import NavigationBar from './components/NavigationBar';
import Shows from './pages/Shows';
import UserShowList from './pages/UserShowList';
import ShowPage from './pages/ShowPage';
import HomePage from './pages/HomePage';
import ProfileSetup from './components/ProfileSetup';
import Admin from './pages/Admin';

const checkProfileExists = async (user) => {
  const profileRef = doc(db, 'profiles', user.uid);
  const profileDoc = await getDoc(profileRef);
  return profileDoc.exists();
};


function App() {
  
  const [user] = useAuthState(auth);
  const [profileExists, setProfileExists] = useState(null);
  const profilesRef = collection(db, 'profiles');
  const profiles = useCollectionData(profilesRef, {idField: 'id'});
  useEffect(() => {
    if (user) {
      checkProfileExists(user).then((result) => setProfileExists(result));
    }
  }, [user, profiles]);


  const [profile, setProfile] = useState(null);
  useEffect(() => {
    if (user && profileExists) {
      const profileRef = doc(db, 'profiles', user.uid);
      const profileDoc = getDoc(profileRef).then((doc) => {
        if (doc.exists()) {
          setProfile(doc.data());
        }
      });
    }
  }, [user, profileExists]);

  if (user && profileExists === null) {
    return <div className='App'>
      <div className='App-header'>Loading..</div>
    </div>
  }

  if (user && !profileExists) {
    return <div className='App'>
      <div className='App-header'>
        <ProfileSetup />  
      </div>
    </div>
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <Router>
        <NavigationBar user={user} />
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/shows" element={<Shows/>} />
            <Route path="/showlist" element={<UserShowList/>} />
            <Route path="/showpage/:title" element={<ShowPage/>} />
            {profile?.isAdmin && <Route path="/admin" element={<Admin/>} />}
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
