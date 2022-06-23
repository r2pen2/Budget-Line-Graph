import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB-WnWl81Jgb0wExFvJD2ydeGqqGXzjNyU",
  authDomain: "budgeteer-cd3b3.firebaseapp.com",
  projectId: "budgeteer-cd3b3",
  storageBucket: "budgeteer-cd3b3.appspot.com",
  messagingSenderId: "841108331371",
  appId: "1:841108331371:web:c6cd4e9360fc1583fc8a2e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoUrl;

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("pfpUrl", profilePic);
        window.location = "/home";
    }).catch((error) => {
        console.log(error);
    });
}

export const signOutUser = () => {
    signOut(auth);
    window.location = "/home";
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("pfpUrl");
}