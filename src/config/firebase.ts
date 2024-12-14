import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  // Your Firebase config object from the Firebase Console

    apiKey: "AIzaSyCBznAUfxCX79so-TeJrCgBt5PwkgLuAOE",
    authDomain: "productscraper-31de3.firebaseapp.com",
    projectId: "productscraper-31de3",
    storageBucket: "productscraper-31de3.firebasestorage.app",
    messagingSenderId: "949058949256",
    appId: "1:949058949256:web:2dc7a4fc82b6382aba8f3d"
  
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

