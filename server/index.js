'use strict';

// Requires and declarations
require('dotenv').config();

var express  = require('express'),
	app      = express(),
	request  = require('request'),
	Cloudant = require('cloudant');

var token = process.env.GROUPME_TOKEN;
var group = process.env.GROUPME_GROUP;

var cloudant = Cloudant({account: process.env.CLOUDANT_ACCOUNT, 
						password: process.env.CLOUDANT_PASSWORD});

var database = cloudant.use('messages');

var url = 'https://api.groupme.com/v3/groups/' + group + '/messages?token=' + token;

app.get('/', function(req, res) {
	res.sendStatus(200);
});

app.get('/save', function(req, res) {
	request(url, function(err, response, body) {
		var payload = JSON.parse(body);

		database.insert(payload, function(err, body) {
			if (err)
				console.log(err);
			else {
				console.log(body);
				res.sendStatus(200);
			}
		});
	});
});

app.get('/messages', function(req, res) {
	database.list({include_docs: true}, function(err, body) {
		res.send(body);
		console.log('Documents retrieved');
	});
});


module.exports = app;
