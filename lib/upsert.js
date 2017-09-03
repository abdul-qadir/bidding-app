
// copied from https://gist.github.com/timhuff/f4f0814b0eb048784e44e744aa8e41f5

const returning = " WHERE 'updated' = set_config('upsert.action', 'updated', true) returning *, CASE WHEN current_setting('upsert.action', true) = 'updated' THEN 'updated' ELSE 'inserted' END as upsert";

module.exports = function upsert(knex) {
  return ({ table, object, constraint }) => {
    const insert = knex(table).insert(object).toString();
    const update = knex.queryBuilder().update(object).toString();
    return knex.raw(`${insert} ON CONFLICT (${constraint}) DO ${update} ${returning}`).then(result => result.rows[0]);
  };
};


/*

Usage :
    upsert({
      table: 'test',
      object: objToUpsert,
      constraint: 'a, b', //unique constaint(s) like an id etc
    });

  Note: this function will return a column named 'upsert' set to 'updated' or 'inserted' depending on the action

*/
