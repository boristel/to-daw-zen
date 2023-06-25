import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBd3O6Hg1hohsz1d086s1zXTFTIhh2BWtk",
    authDomain: "zenmember-76409.firebaseapp.com",
    projectId: "zenmember-76409",
    storageBucket: "zenmember-76409.appspot.com",
    messagingSenderId: "421781070702",
    appId: "1:421781070702:web:519bb7eba459501006977f",
    measurementId: "G-KEQD86RV38"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export { timestamp };
  export default firebaseApp.firestore();

// const { initializeApp } = require("firebase/app");
// const { initializeAppCheck, ReCaptchaV3Provider } = require("firebase/app-check");

// const app = initializeApp({
//   // Your firebase configuration object
// });

// // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// // key is the counterpart to the secret key you set in the Firebase console.
// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider('zenspa168'),

//   // Optional argument. If true, the SDK automatically refreshes App Check
//   // tokens as needed.
//   isTokenAutoRefreshEnabled: true
// });