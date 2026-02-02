import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyABzoQefJbDvRzfQXtbgwo0lBgol35HyPo',
  authDomain: 'landmark-31938.firebaseapp.com',
  projectId: 'landmark-31938',
  storageBucket: 'landmark-31938.firebasestorage.app',
  messagingSenderId: '130594678282',
  appId: '1:130594678282:web:ee34acf36300da93e161f3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
