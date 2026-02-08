import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

console.log("Firebase Config check:", {
    apiKey: firebaseConfig.apiKey ? "Present" : "Missing",
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain
});

// Validate config
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'your_api_key_here') {
    console.error('CRITICAL: Firebase config keys are missing! Check .env file.');
    alert('Firebase Config Missing! Please update .env file with real keys.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
