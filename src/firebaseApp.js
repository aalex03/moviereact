import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBUyDhtWkPCPoNahE6U8apjziVWRSkkGRU",
    authDomain: "mymovielist-2ebef.firebaseapp.com",
    projectId: "mymovielist-2ebef",
    storageBucket: "mymovielist-2ebef.appspot.com",
    messagingSenderId: "463710500610",
    appId: "1:463710500610:web:db3c2421f822c0dfd4f41b"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {app, db, auth, storage}