exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('name');
        table.string('email').unique().index().nullable();
        table.integer('role_id').nullable();
        table.string('password').nullable();
        table.boolean('status').defaultTo(1);
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
