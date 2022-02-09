import firebase from 'firebase/app'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpP7Q4S6yponEXO-s_XtabBEwROSpHXss",
  authDomain: "cooking-ninja-2c906.firebaseapp.com",
  projectId: "cooking-ninja-2c906",
  storageBucket: "cooking-ninja-2c906.appspot.com",
  messagingSenderId: "1042736279349",
  appId: "1:1042736279349:web:629ffa98a19c1e9238267c",
  measurementId: "G-J3GTL24H21"
};

//

firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()

export {projectFirestore}