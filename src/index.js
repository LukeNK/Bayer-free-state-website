require('dotenv').config();
const express = require('express');
const fs = require('fs');
var app = express();

/**
 * Render template and serve html files
 * @param {String} fName Local file name
 * @param {Function} callback Callback. Params: (data, err)
 */
function serveFile(fName, callback) {
    fs.readFile(fName, 'utf8', (err, data) => {
        if (err) return callback(null, err);
        let req = data.match(/{{(.*?)}}/g);

        if (!req) return callback(data);
        let count = req.length;

        for (let name of req) {
            name = name.substr(2, name.length - 4);
            fs.readFile('./root/comp/' + name, 'utf8', (err, dat) => {
<<<<<<< Updated upstream
                if (err) {
                    console.warn(err);
                }
                data = data.replace(RegExp(`{{${name}}}`, 'g'), dat);
=======
                if (err) console.warn(err);

                data = data.replace(/{{(.*?)}}/g, dat);
>>>>>>> Stashed changes
                count--;
                if (!count) callback(data);
            });
        }
    });
}

app.get('/', (req, res) => {
    serveFile('./root/pages/index.html', (data) => {
        res.send(data);
    });
});

app.post('/API/*', (req, res) => {});

app.use('/public', express.static('root/public'));

app.get('/:name', (req, res) => {
    // pages (no .html)
    serveFile('./root/pages/' + req.params.name + '.html', (data, err) => {
        if (err && req.params.name !== '404') {
            res.redirect('/404');
            return;
        }
        res.send(data);
    });
});

app.listen(process.env.listenPort, () => {
    console.warn(`Listening at port ${process.env.listenPort}.`);
});
