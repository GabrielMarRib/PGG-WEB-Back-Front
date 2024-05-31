const express = require('express');
const routes = require('./routes')
const cors = require('cors');
const app = express();

//npm i react-scripts
//npm uninstall react-scripts
//npm i express
//npm i firebase
//npm i firebase-admin
//npm i nodemon

app.use(express.json());
app.use(cors());
app.use(routes);

app.get('/', (req,res) => {
    res.send('testiculo');
});

app.listen(4000, () => {
    console.log('listening on port 4000');
});