import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// UniMeet web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIZELBdvncmPHlUduOE030P9zjDK7fZxs",
  authDomain: "unimeet-db.firebaseapp.com",
  projectId: "unimeet-db",
  storageBucket: "unimeet-db.appspot.com",
  messagingSenderId: "107988111323",
  appId: "1:107988111323:web:31a05627bc811c297221fe",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userDocSnap = await getDoc(userDocRef);
  console.log(userDocSnap);
  console.log(userDocSnap.exists());

  if (!userDocSnap.exists()) {
    const { email, photoURL, displayName } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        photoURL,
        displayName,
        createdAt,
      });
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return userDocRef;
};
