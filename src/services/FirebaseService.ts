
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiduL-t2g52nbZlGAjN1J86y1bmmnYtdc",
  authDomain: "aizzle.firebaseapp.com",
  projectId: "aizzle",
  storageBucket: "aizzle.firebasestorage.app",
  messagingSenderId: "947541181864",
  appId: "1:947541181864:web:8b6c51f20538bf5e4d899d",
  measurementId: "G-GN7RTN39M0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, db, auth, analytics };
