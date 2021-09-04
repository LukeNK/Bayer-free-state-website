require('dotenv').config();
const fs = require('fs');
const config = require('./config.json');
const express = require('express');
const app = express();
const router = express.Router();

// let ROUTECOUNT = {}; // each URL count for DDOS prevention
let BLOCKED_LIST = [];
let IP_LIST = {};

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
                count--;
                data = data.replace(RegExp(`{{${name}}}`, 'g'), dat || '');
                if (err) return console.warn(err);
                if (!count) callback(data);
            });
        }
    });
}

router.use((req, res, next) => {
    if (req.url === '/403') return next();

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (!IP_LIST[ip]) IP_LIST[ip] = 0;

    if (IP_LIST[ip] <= config.rateLimit.maxCount) {
        IP_LIST[ip]++;
        console.log(IP_LIST[ip]);
        console.log(`IP: ${ip}, URL: ${req.url}`);
        // setTimeout(() => {
        //     IP_LIST[ip]--;
        // }, config.rateLimit.timeout);
    }
    else return res.redirect(403, '/403');

    next();
});

app.use(router);

// clear bans
setInterval(() => {
    for (const [ key, _ ] of Object.entries(IP_LIST)) {
        IP_LIST[key] = 0;
    }
}, config.rateLimit.timeout);

app.get('/', (req, res) => {
    serveFile('./root/pages/index.html', (data) => {
        res.send(data);
    });
});

app.get('/link/:name', (req, res) => {
    try {
        res.redirect(config.links[req.params.name]);
    } catch (err) {
        res.redirect('/404');
    }
});

app.post('/API/*', (req, res) => {});

app.use('/public', express.static('root/public'));

app.get('*', (req, res) => {
    // pages (no .html)
    serveFile('./root/pages/' + req.url + '.html', (data, err) => {
        if (err && req.params.name !== '404') return res.redirect('/404');
        res.send(data);
    });
});

app.listen(process.env.PORT, () => {
    console.warn(`Listening at port ${process.env.PORT}.`);
});
