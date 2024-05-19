const admin = require('firebase-admin');
const serviceAccount = require('./zetta2-firebase-adminsdk-9avfc-b37c5c584a.json'); // Certifique-se de que o caminho para o arquivo está correto

// Inicialize o Firebase Admin SDK com as credenciais
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://zetta2.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };
