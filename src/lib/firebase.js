import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyCu2GjFkBWZCzrbE2Y1mqq8u5uYD-zwTfQ",
//   authDomain: "leads-fc7d4.firebaseapp.com",
//   projectId: "leads-fc7d4",
//   storageBucket: "leads-fc7d4.firebasestorage.app",
//   messagingSenderId: "319374718589",
//   appId: "1:319374718589:web:8da4c94f976a1358b46314",
// };

const firebaseConfig = {
  apiKey: "AIzaSyB3sp450H1Z1v5zziokfwt4TYUPh-YrRCA",
  authDomain: "broaddcast.firebaseapp.com",
  projectId: "broaddcast",
  storageBucket: "broaddcast.firebasestorage.app",
  messagingSenderId: "69944464490",
  appId: "1:69944464490:web:e71343480a098251b3e613"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
