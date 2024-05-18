const express = require('express');
const routes = express.Router();

const users = [{
    id: 1,
    name: "Mehelpa",
    email: "tguigomarques@gmail.com",
    password: "outrasenha"
}];

routes.post('/Login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        return res.status(200).json(user);
    } else {
        return res.status(401).json({ message: "Usuário ou senha inválidos" });
    }
});

module.exports = routes;
