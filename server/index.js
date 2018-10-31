const express = require('express');
const path = require('path');
const requireMiddleware = require('./middleware');
const app = express();

requireMiddleware(app);

module.exports = app;



