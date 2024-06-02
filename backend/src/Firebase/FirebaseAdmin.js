const admin = require('firebase-admin');
const serviceAccount = require('./zetta3-2f008-firebase-adminsdk-l78pl-d0a0d8fc4a.json'); // Certifique-se de que o caminho para o arquivo está correto

// Inicialize o Firebase Admin SDK com as credenciais
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://Zetta3.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };
