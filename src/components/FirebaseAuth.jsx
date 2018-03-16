import React from 'react';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Sets the `signedIn` state property to `true` once signed in.
  callbacks: {
    signInSuccess: () => {
      this.setState({ signedIn: true });
      return false; // Avoid redirects after sign-in.
    },
  },
};

const SignInScreen = () =>
  <div><FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /></div>;

export default SignInScreen;
