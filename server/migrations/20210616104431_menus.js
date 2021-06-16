exports.up = function (knex) {
    return knex.schema.createTable('menus', function (table) {
        table.increments();
        table.string('name');
        table.string('link').nullable();
        table.string('icon').nullable();
        table.integer('parent_id').index().nullable();
        table.integer('order_no').defaultTo(1);
        table.boolean('status').defaultTo(1);
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('menus');
};
