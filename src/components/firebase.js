import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBG1UiWrTbGTuJiL5LqdBATgU_HTyc20kI",
  authDomain: "macleanlifecoaching.firebaseapp.com",
  databaseURL: "https://macleanlifecoaching.firebaseio.com",
  projectId: "macleanlifecoaching",
  storageBucket: "macleanlifecoaching.appspot.com",
  messagingSenderId: "906188243378",
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;

