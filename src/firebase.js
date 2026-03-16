import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC4GKGwExRba4FUJBN1qwZtWuixbMC7ugA',
  // Use the firebaseapp.com domain so Google OAuth redirect URIs are pre-configured
  authDomain: 'spearheadscoretracker.firebaseapp.com',
  projectId: 'spearheadscoretracker',
  storageBucket: 'spearheadscoretracker.firebasestorage.app',
  messagingSenderId: '176525277455',
  appId: '1:176525277455:web:2d6f9964e8f65c249d667a',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
