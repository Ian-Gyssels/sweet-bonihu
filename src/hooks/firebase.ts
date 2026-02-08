import {initializeApp} from 'firebase/app';
import {getAuth, browserLocalPersistence, setPersistence} from 'firebase/auth';

// Firebase client-side config — these are publishable keys (not secrets).
// Replace the placeholder values below with your Firebase project credentials.
// You can find them in Firebase Console > Project Settings > General > Your Apps.
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Ensure auth state persists across page reloads
setPersistence(auth, browserLocalPersistence);

export {auth};
export default app;