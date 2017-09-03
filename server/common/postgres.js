 /* eslint-disable spaced-comment, no-use-before-define, consistent-return, no-loop-func */
/**
 * Created by sandeepkumar on 27/02/17.
 */
// const pg = require('pg');
const config = require('config');

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'public',
  ssl: config.NODE_ENV === 'production',
});

module.exports = {
  select,
  insert,
  batchInsert,
  update,
  del,
  upsertItem,
  insertItemIfNoConflict,
  knex,
};

function upsertItem(tableName, conflictTarget, itemData) {
  const exclusions = Object.keys(itemData)
    .filter(c => c !== conflictTarget)
    .map(c => knex.raw('?? = EXCLUDED.??', [c, c]).toString())
    .join(',\n');

  const insertString = knex(tableName).insert(itemData).toString();
  const conflictString = knex.raw(` ON CONFLICT (??) DO UPDATE SET ${exclusions} RETURNING *;`, conflictTarget).toString();
  const query = (insertString + conflictString).replace(/\?/g, '\\?');

  return knex.raw(query);
}

function insertItemIfNoConflict(tableName, conflictTarget, itemData) {
  // const exclusions = Object.keys(itemData)
  //   .filter(c => c !== conflictTarget)
  //   .map(c => knex.raw('?? = EXCLUDED.??', [c, c]).toString())
  //   .join(',\n');

  const insertString = knex(tableName).insert(itemData).toString();
  const conflictString = knex.raw(' ON CONFLICT (??) DO NOTHING RETURNING *;', conflictTarget).toString();
  const query = (insertString + conflictString).replace(/\?/g, '\\?');

  return knex.raw(query)
    .on('query', data => console.log(`Knex: ${data.sql}`));
}

function select(table, columns, queryParams) {
  return knex.select(columns)
    .from(table)
    .where(queryParams || {});
}

function insert(table, data) {
  return knex(table)
    .insert(data, true);
}

function batchInsert(table, rows, chunkSize, returningColumns = ['id']) {
  return knex.batchInsert(table, rows, chunkSize)
    .returning(returningColumns);
}

function update(table, queryParams, data) {
  return knex(table)
    .where(queryParams)
    .update(data, true);
}

function del(table, queryParams) {
  return knex(table)
    .where(queryParams)
    .del();
}
