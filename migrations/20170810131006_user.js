exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.withSchema('public').createTableIfNotExists('users', (table) => {
      table.string('user_id').notNullable().primary();
      table.string('name').notNullable();
      table.text('email');
      table.dateTime('last_logged').defaultTo(knex.raw("timezone('utc'::text, now())"));
      table.dateTime('created_at').defaultTo(knex.raw("timezone('utc'::text, now())"));
    }),
    knex.schema.withSchema('public').createTableIfNotExists('bidding_users', (table) => {
      table.increments('id').primary();
      table.string('user_id').notNullable();
      table.integer('object_id').notNullable();
      table.integer('price').notNullable();
      table.dateTime('created_at').defaultTo(knex.raw("timezone('utc'::text, now())"));
            // table.foreign('user_id').references('users.user_id');
    }),
    knex.schema.withSchema('public').createTableIfNotExists('bidding_winner', (table) => {
      table.increments('id').primary();
      table.string('user_id').notNullable();
      table.integer('object_id').notNullable();
      table.integer('price').notNullable();
      table.dateTime('updated_at').defaultTo(knex.raw("timezone('utc'::text, now())"));
          // table.foreign('user_id').references('users.user_id');
    }),
    knex.schema.withSchema('public').createTableIfNotExists('gallery', (table) => {
      table.increments('id').primary();
      table.string('user_id').notNullable();
      table.string('owner').notNullable();
      table.integer('base_price').notNullable().defaultTo(150),
            table.string('url').notNullable();
      table.dateTime('created_at').defaultTo(knex.raw("timezone('utc'::text, now())"));
            // table.foreign('user_id').references('users.user_id');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.withSchema('public').dropTableIfExists('users'),
    knex.schema.withSchema('public').dropTableIfExists('bidding_users'),
    knex.schema.withSchema('public').dropTableIfExists('bidding_winner'),
    knex.schema.withSchema('public').dropTableIfExists('gallery'),
  ]);
};
