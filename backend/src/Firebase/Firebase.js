// Firebase/Firebase.js
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyAJSHrvSJr4j5u1B2SMukVD6gfWawanwZ8",
    authDomain: "zetta2.firebaseapp.com",
    projectId: "zetta2",
    storageBucket: "zetta2.appspot.com",
    messagingSenderId: "1062649011076",
    appId: "1:1062649011076:web:de5f12c809fd1814945bd1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

module.exports = { app, auth };