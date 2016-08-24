'use strict';

var utils   = require('./utils.js'),
    request = require('request');

var userCount = [];
var working_data = [];
var url = "http://localhost:3000/messages";

request(url, function(err, response, data) {
	var file = JSON.parse(data);

	for (var i = 0; i < file.rows.length; i++) {
		working_data.push(file.rows[i].doc.response.messages);
	}

	extractData(working_data);
	console.log(userCount);

});

function extractData(data) {

	userCount = [];

	for (var i = 0; i < data.length; i++) {
		for (var z = 0; z < data[i].length; z++) {
			
			var obj = {
				name: data[i][z].name,
				text: data[i][z].text,
				likes: data[i][z].favorited_by.length
			};

			userCount.push(obj);	
		}
	}
}