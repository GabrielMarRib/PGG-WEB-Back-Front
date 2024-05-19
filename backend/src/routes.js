const express = require('express');
const routes = express.Router();
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { app } = require('./Firebase/Firebase.js');
const { db } = require('./Firebase/FirebaseAdmin.js');

routes.post('/Login', async (req, res) => { // Adicionando 'async' aqui
    const auth = getAuth(app);
    const { email, password } = req.body;
    
    try {
        // Autenticação no Firebase
        await signInWithEmailAndPassword(auth, email, password);

        // Obtenha o usuário autenticado
        const user = auth.currentUser;


        // Buscar informações adicionais no Firestore
        const userDoc = await db.collection('Logins').doc(user.uid).get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: "Usuário não encontrado no Firestore" });
        }

        const userData = userDoc.data();
    
        // Retorne os dados do usuário
        return res.status(200).json({
          id: user.uid,
          userData: userData,
        });
    } catch (error) {
        // Trate os erros de autenticação
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
            return res.status(401).json({ message: "Usuário ou senha inválidos" });
        } else {
            return res.status(500).json({ message: "Erro desconhecido", error: error.message });
        }
    }
});

module.exports = routes;
