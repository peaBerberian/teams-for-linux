const dns = require('dns');
async function checkConnectivity(timeout, retries) {
	var resolved = false;
	for (var i = 1; i <= retries && !resolved; i++) {
		if (i > 1) await sleep(timeout);
		resolved = await checkConnectionState();
	}
	return resolved;
}

async function checkConnectionState() {
	try {
		await resolveDNS();
		return true;
	} catch (err) {
		return false;
	}
}

function sleep(timeout) {
	return new Promise(r => setTimeout(r, timeout));
}

function resolveDNS() {
	return new Promise((res, rej) => {
		dns.resolve('www.microsoft.com', (err) => {
			if (err) {
				rej(err);
			} else {
				res();
			}
		});
	});
}

module.exports = checkConnectivity;