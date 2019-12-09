import firebase from 'firebase/app'; // firebase utility library from installing firebase with yarn
// we don't want the ones we won't use - it's a very large library
  // but we will always need the base import
import 'firebase/firestore'; // this is the storage (database)
import 'firebase/auth' // this is the authentication


const config = {
  apiKey: "AIzaSyB7RPA5GWfTsJ1wAgdX-jTwSoFqMkZ3edE",
  authDomain: "crwn-db-513ae.firebaseapp.com",
  databaseURL: "https://crwn-db-513ae.firebaseio.com",
  projectId: "crwn-db-513ae",
  storageBucket: "crwn-db-513ae.appspot.com",
  messagingSenderId: "191761148089",
  appId: "1:191761148089:web:d746b8792c56d61b869368",
  measurementId: "G-GYQJG5SC1K"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
