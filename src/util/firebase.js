import firebase from 'firebase'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "friday-lunch-picker.firebaseapp.com",
  databaseURL: "https://friday-lunch-picker.firebaseio.com",
  projectId: "friday-lunch-picker",
  storageBucket: "friday-lunch-picker.appspot.com",
  messagingSenderId: "401870957228"
};

firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth;
export const provider = new firebase.auth.GoogleAuthProvider();

export const dbUsers = firebase.database().ref('users/');
export const dbRecommendations = firebase.database().ref('recommendations/');

export const fbPersistListItems = (listItems) => {
  dbUsers.set();
}

export const userSignIn = () => firebaseAuth().signInWithRedirect(provider)

export const userSignOut = () => firebaseAuth().signOut()
