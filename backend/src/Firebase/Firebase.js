// Firebase/Firebase.js
const { initializeApp } = require('firebase/app');

const firebaseConfig = {
  apiKey: "AIzaSyBZsNU9pHjwpQO0PAtGk1-os58Rfha7phU",
  authDomain: "zetta3-2f008.firebaseapp.com",
  projectId: "zetta3-2f008",
  storageBucket: "zetta3-2f008.appspot.com",
  messagingSenderId: "938225031192",
  appId: "1:938225031192:web:ae090ac74072b9541ccb6d",
  measurementId: "G-W4GHQM8C3Z"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


module.exports = { app };