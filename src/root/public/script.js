function getData(url, data, callback) {
	const xhttp = new XMLHttpRequest();
	xhttp.open(data ? 'POST' : 'GET', url);
	xhttp.send(data ? data : '');
	xhttp.onload = function() {
		if (this.status == 200) {
			callback(this.responseText);
		} else callback(null, this.status);
	};
}

function getCookie(cname) {
	let name = cname + '=';
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');

	for (let i = 0; i < ca.length; i++) {
		let c = ca[i].trimStart();
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}

function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	let expires = 'expires=' + d.toUTCString();
	document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function openNav() {
	document.getElementById('sideMenu').style.width = '250px';
}

function closeNav() {
	document.getElementById('sideMenu').style.width = '0';
}
