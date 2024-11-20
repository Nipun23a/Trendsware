import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: "trendsware-b1b13",
    storageBucket: "trendsware-b1b13.appspot.com",
    messagingSenderId: "131552041724",
    appId: "1:131552041724:web:fcdc4819efdd571418d579",
    measurementId: "G-CNFE9D1800"
};
  

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default {app,storage,auth,db};