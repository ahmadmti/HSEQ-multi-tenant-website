exports.up = function(knex) {
    return knex.schema.createTable('roles', function(table) {
        table.increments();
        table.string('display_name').nullable();
        table.string('name').nullable();
        table.boolean('status').default(0);

        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('roles');
};