require('dotenv').config();
const express = require('express');
const fs = require('fs');
var app = express();

function serveFile(fName, callback) {
    fs.readFile(fName, 'utf8', (err, data) => {
        if (err) { console.warn(err); return }
        let req = data.match(/{{(.*?)}}/g);
        let count = req.length;
        for (let name of req) {
            name = name.substr(2, name.length - 4);
            fs.readFile('./public/comp/' + name, 'utf8', (err, dat) => {
                if (err) { console.warn(err); }
                data = data.replace(/{{(.*?)}}/g, dat);
                count--;
                if (!count) callback(data);
            });
        }
    })
}

app.get('/', (req, res) => {
    serveFile('./page/doc/constitution.html', (data) => {
        res.send(data);
    })
});

app.post('/API/*', (req, res) => {});

app.use(express.static('public'));

app.listen(process.env.listenPort, () => {
    console.warn('Listening at port ' + process.env.listenPort);
})