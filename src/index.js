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
			name = name.substring(2, name.length - 2);
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
	} else return res.redirect(403, '/403');

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

app.post('/API/statute', (req, res) => {
	let inData = '';
	req.on('data', (c) => {
		inData += c;
	});
	req.on('end', () => {
		https.get(path.join(config.links.statueBase, data), (res2) => {
			let outData = '';
			res2.on('data', (c) => {
				outData += c;
			});
			res2.on('end', () => {
				res.send(outData);
			});
			res2.on('error', () => {
				res.sendStatus(404);
				res.send('');
			});
		});
	});
});

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
