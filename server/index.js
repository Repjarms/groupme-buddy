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
var payload = '';
var last_message = 0;

app.get('/', function(req, res) {
	res.sendStatus(200);
});

app.get('/message', function(req, res) {
	request(url, function(err, res, body) {
		payload = JSON.parse(body);

		database.insert(payload, function(err, body) {
			if (err) {
				console.log(err);
			}else{
				console.log(body);
			}

		});

	});

	res.sendStatus(200);
});

module.exports = app;
