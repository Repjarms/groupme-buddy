'use strict';

var test = require('tape');
var request = require('supertest');
var app = require('../server');

test('200 returned', function(t) {
	request(app)
	  .get('/')
	  .end(function(err, res) {
	  	var expectedStatus = 200;

	  	t.error(err, 'No error');
	  	t.same(res.status, expectedStatus, 'Server returns 200');
	  	t.end(); 
	   });
});

test('/message returns 200', function(t) {
	request(app)
	  .get('/message')
	  .expect(200)
	  .end(function(err, res) {
	  	if (err) throw err;
	  });
});

