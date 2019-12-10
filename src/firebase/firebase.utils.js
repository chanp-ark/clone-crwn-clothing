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

// to update and store information into the Firestore database
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // if the userAuth object doesn't exist, exit the function
  if (!userAuth) return;
  
  // the Firestore library gives us a QueryReference or QuerySnapshot
        // Query = request we make to Firestore to give us something from the database
            // QueryReference = object that represents the "current" place in the DB that we are querying
              // call by either
                // firestore.doc('/users/:userId') or
                // firestore.collections('/users')
              // It has properties that tell us details about the database, 
                  // or the method to get the Snapshot object which gives us the desired data 
        // returns two types of objects: references and snapshots
          // of these two, they can be either Document or Collection version
        // Firestore will ALWAYS return us these objects, even if nothing exists from that query
  //Using these objects, we can determine whether or not the data is there
    // use .get() to get the snapshotObject from the referenceObject, 
      // i.e. documentRef.get() {this returns a documentSnapshot Object} or collectionRef.get() {this return a querySnapshot object}
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  
  const snapShot = await userRef.get();
  
    
  // if it doesn't exist, we will create data there using userRef 
      // snapShot only REPRESENTS the data
      // any methods of creating, retrieving, updating, or deleting (CRUD method), we need to use documentRef
  if(!snapShot.exists) {
     const { displayName, email } = userAuth;
     const createdAt = new Date();
     
     try {
       await userRef.set({
         displayName,
         email,
         createdAt,
         ...additionalData
       })
     } catch (error) {
       console.log('error creating user', error.message)
     }
  }
  
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
