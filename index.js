'use strict';

var path = require('path');
var koa = require('koa');
var co = require('co');

var app = koa();

// logs
var logger = require('koa-logger');
app.use(logger());

// static file
var serve = require('koa-static');
app.use(serve(path.resolve(__dirname, './')));

// how to use fake data
// GET http://localhost:3000/data.json will return fake-data/data.json

app.listen(3000);