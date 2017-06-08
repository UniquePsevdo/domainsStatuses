const request = require('request-promise');
const tlds = ["com", "net", "org", "info", "biz", "me", "co", "co.uk"];

function getCheckIdPostData(domainName) {
	return {
		apikey: process.env.API_KEY,
		sld: domainName,
		tlds: tlds
	}
};

function getCheckIdOptions(domainName) {
	return {
		method: 'POST',
		uri: 'https://porkbun.com/api/json/v1/domain/initializecheck',
		body: getCheckIdPostData(domainName),
		json: true
	}
};

function getDomainsPostData(checkId) {
	return {
		apikey: process.env.API_KEY,
		checkid: checkId
	}
};

function getDomainsOptions(checkId) {
	return {
		method: 'POST',
		uri: 'https://porkbun.com/api/json/v1/domain/getcheck',
		body: getDomainsPostData(checkId),
		json: true
	}
};

exports.getDomainsStatuses = (req, res, next) => {
	request(getCheckIdOptions(req.body.domainName)).then(function (body) {
		return body;
	}).then(function (body) {
			return request(getDomainsOptions(body.checkId));
		})
		.then(function (body) {
			res.status(200).send(body.results);
		})
		.catch(function (err) {
			next(err);
		});
};