import { useContext } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { UserContext } from './UserContext'

const firebaseConfig = {
  apiKey: "AIzaSyB-WnWl81Jgb0wExFvJD2ydeGqqGXzjNyU",
  authDomain: "budgeteer-cd3b3.firebaseapp.com",
  projectId: "budgeteer-cd3b3",
  storageBucket: "budgeteer-cd3b3.appspot.com",
  messagingSenderId: "841108331371",
  appId: "1:841108331371:web:c6cd4e9360fc1583fc8a2e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
    return new Promise((resolve, reject) => {
        signInWithPopup(auth, provider).then((result) => {
            resolve(result.user);
        }).catch((error) => {
            reject(error);
        });
    })
}

export async function signOutUser() {
    return new Promise((resolve, reject) => {
        signOut(auth).then((result) => {
            resolve(null);
        }).catch((error) => {
            reject(error);
        });
    })
}