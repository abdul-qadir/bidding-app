const winston = require('winston');
const postgresService = require('./postgres');
const auth0Service = require('./auth0');
const Promise = require('bluebird');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: 'all',
    }),
  ],
});

function handleError(error, respond) {
  logger.log('error', error);
  respond.status(500).send({
    original: error,
    error: {
      message: error.message,
    },
  });
}

function getUserId(req) {
  return new Promise((resolve, reject) => {
    const authorizationToken = req.get('Authorization');
    if (authorizationToken) {
      const parts = authorizationToken.split(' ');

      if (parts.length === 2 && parts[0] === 'Bearer') {
        auth0Service.getUserId(parts[1]).then(resolve).catch(reject);
      } else {
        reject(new Error('Authorization Header should be set to Bearer'));
      }
    } else {
      reject(new Error('Authorization Header not found'));
    }
  });
}

function getUserProfile(req) {
  return new Promise((resolve, reject) => {
    const authorizationToken = req.get('Authorization');
    if (authorizationToken) {
      const parts = authorizationToken.split(' ');

      if (parts.length === 2 && parts[0] === 'Bearer') {
        auth0Service.getUserProfile(parts[1]).then(resolve).catch(reject);
      } else {
        reject(new Error('Authorization Header should be set to Bearer'));
      }
    } else {
      reject(new Error('Authorization Header not found'));
    }
  });
}

module.exports = {
  postgresService,
  auth0Service,
  getUserId,
  getUserProfile,
  handleError,
  logger,
};
