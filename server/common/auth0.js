 /* eslint-disable consistent-return */
// const request = require('request');
const request = require('request-promise');
const Promise = require('bluebird');

function getUserProfile(token) {
  return request({
    url: `${process.env.AUTH0_DOMAIN}/tokeninfo`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    json: {
      id_token: token,
    },
  });
}

// Fetch the user details based on the token

function getUserId(token) {
  return new Promise((resolve, reject) => {
    getUserProfile(token)
      .then((response) => {
        if (response && response.user_id) {
          const userId = response.user_id;
          resolve(userId.substr(userId.indexOf('|') + 1));
        } else {
          reject(new Error('Authorization Failed'));
        }
      })
      .catch(reject);
  });
}

module.exports = {
  getUserId,
  getUserProfile,
};
