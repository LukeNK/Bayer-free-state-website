require('dotenv').config();
const express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send('hello world');
});

app.post('/API/*', (req, res) => {});

app.use(express.static('public'));

app.listen(process.env.listenPort, () => {
    console.warn('Listening at port ' + process.env.listenPort);
})