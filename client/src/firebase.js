import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBLAZrKMyIySC1fHXnfOhKGEf8Zvm0xxCs",
    authDomain: "wnb-gr-fe68c.firebaseapp.com",
    projectId: "wnb-gr-fe68c",
    storageBucket: "wnb-gr-fe68c.appspot.com",
    messagingSenderId: "686217381487",
    appId: "1:686217381487:web:d0361daa04f229ca0b2f9a"
    // apiKey: "AIzaSyDI7Vb6iVRgadGkzU8qaTuWceBa69L5M60",
    // authDomain: "wnb-gr-2.firebaseapp.com",
    // projectId: "wnb-gr-2",
    // storageBucket: "wnb-gr-2.appspot.com",
    // messagingSenderId: "1067491045294",
    // appId: "1:1067491045294:web:896d501aa1cc3d3e3c623f"
};

firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); 