const express = require('express');
const routes = express.Router();
const { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } = require('firebase/auth');
const { app } = require('./Firebase/Firebase.js');
const { admin, db } = require('./Firebase/FirebaseAdmin.js');


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

routes.post('/RedefinirSenha', async (req, res) => {
    const auth = getAuth(app);
    const { email } = req.body;

    try {
        await sendPasswordResetEmail(auth, email); // se der ruim, manda exception....

        return res.status(200).json({ message: "Caso o e-mail estiver cadastrado, enviamos um link de redefinição" })

    } catch (error) {
        if (error.code === 'auth/invalid-email')
            return res.status(400).json({ message: "Email inválido inserido" }) //400 = Bad Request, nao foi possivel concluir a operação
        else if (error.code === 'auth/user-not-found')
            return res.status(404).json({ message: "Email não encontrado na base de dados" }) // 404 = Not found, nao achou
        else
            return res.status(500).json({ message: "Erro desconhecido", error: error.message }); //500 internal server error, ou seja, deu merda mas nao se sabe qual
    }
});

routes.post('/CriarFuncionario', async (req, res) => {
    const auth = admin.auth();

    //vindo do frontend...
    const { nome, cpf, email, telefone, acesso } = req.body;

    //senha aleatória...
    //const senhaAleat = gerarSenhaAleat(15);


    try {
        const userRecord = await auth.createUser({
            email: email,
            password: "batataFrita"
        });
        const userId = userRecord.uid;
        const LoginsRef = db.collection('Logins');
        const docRef = LoginsRef.doc(userId);
        await docRef.set({
            Nome: nome,
            Email: email,
            CPF: cpf,
            Celular: telefone,
            Nivel_acesso: acesso
        });
        return res.status(200).json({ message: "Usuario adicionado" })

    } catch (error) {
        return res.status(500).json({ message: "Erro ao adicionar o usuario", error: error.message });
    }
});

module.exports = routes;
