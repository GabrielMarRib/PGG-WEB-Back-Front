const express = require('express');

const routes = express.Router();
const users = [{
    id: 1,
    name: "Mehelpa",
    email: "tguigomarques@gmail.com",
    password: "outrasenha"
}]

routes.post('/login', (req, res) =>{
    const {email, password } = req.body

    const user = users.find(user => user.email === email && user.password === password) // null

    if(user) // if(user == true), 
        return res.status(200).json(user);

    return res.status(401).json({message: "errrrrou"})
});

module.exports = routes;