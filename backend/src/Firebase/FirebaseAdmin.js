const admin = require('firebase-admin');
const serviceAccount = require('./zetta4-3b4d5-firebase-adminsdk-gg5kx-2331bdcd30.json'); // Certifique-se de que o caminho para o arquivo está correto

// Inicialize o Firebase Admin SDK com as credenciais
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://Zetta2.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };
