const express = require('express');
const routes = require('./routes')
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.get('/', (req,res) => {
    res.send('testiculo');
});

app.listen(4000, () => {
    console.log('listening on port 4000');
});