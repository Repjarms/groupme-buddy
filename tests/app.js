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

test('/messages returns 200', function(t) {
	request(app)
	  .get('/messages')
	  .expect('Content-Type', /json/)
	  .end(function(err, res) {
	  	t.error(err, 'No error');
	  	t.same(res.status, 200, '/messages returns 200');
	  	t.end();
	  });
});

test('/save returns 200', function(t) {
	request(app)
	  .get('/save')
	  .expect('Content-Type', /json/)
	  .end(function(err, res) {
	  	t.error(err, 'No error');
	  	t.same(res.status, 200, '/save returns 200');
	  	t.end();
	  });
});
