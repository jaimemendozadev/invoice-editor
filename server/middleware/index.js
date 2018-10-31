const express = require('express');
const path = require('path');
const publicPath = path.resolve(__dirname, '../../public')
const indexHTML = path.resolve(__dirname, '../../public/index.html');

module.exports = app => {
  app.use(express.static(publicPath));
  app.use('*', (req, res) => res.sendFile(indexHTML));
}