'use strict';

function errorHandler(err, req, res, next) {
  console.error('SERVER ERROR', err)
  res.status(500).send('Server not running')
}

module.exports = errorHandler;