import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

// Set up Google Authentication Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Export Firebase Authentication
export const auth = getAuth();

// Functions to allow user to sign in with Google popup/redirect
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Export Firestore Instances
export const db = getFirestore();

// Function to create a user document in Firestore when a user signs in
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;

  // Reference to the user's document in Firestore
  const userDocRef = doc(db, "users", userAuth.uid);

  // Get the user's document snapshot
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    // Extract user information and set up the document
    const { email, photoURL, displayName } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        photoURL,
        displayName,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return userDocRef;
};

// Function to create a new user account with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// Function to log in an existing user with email and password
export const logInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// Function to sign out the currently authenticated user
export const signOutUser = async () => await signOut(auth);

// Function to listen for changes in the user's authentication state
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getUserGroups = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    //console.log(docSnap.data().groups);
    return docSnap.data().groups;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const getGroupMembers = async (groupId) => {
  const userDocRef = doc(db, "groups", groupId);
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    //console.log(docSnap.data().members);
    return docSnap.data().members;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};
