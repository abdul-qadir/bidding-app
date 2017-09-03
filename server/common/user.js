const moment = require('moment');

const { knex } = require('./../common').postgresService;

const upsert = require('../../lib/upsert')(knex);

function upsertUser(userId, body) {
  const loggedTime = moment.utc().format();
  return upsert({
    table: 'users',
    object: { user_id: userId, last_logged: loggedTime, name: body.name, email: body.email },
    constraint: 'user_id',
  });
}

module.exports = { upsertUser };
