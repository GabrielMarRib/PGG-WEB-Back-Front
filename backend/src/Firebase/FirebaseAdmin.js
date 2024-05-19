// Firebase/FirebaseAdmin.js
const admin = require('firebase-admin');

// Inicialize o Firebase Admin SDK com as credenciais
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://zetta2.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };
