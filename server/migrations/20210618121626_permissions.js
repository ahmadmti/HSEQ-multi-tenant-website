exports.up = function(knex) {
    return knex.schema.createTable('permissions', function(table) {
        table.increments();

        table.integer('role_id').unsigned().index();
        table.integer('menu_id').unsigned().index();

        table.timestamps(true, true);
        table.foreign('role_id').references('roles.id').onDelete('CASCADE');
        table.foreign('menu_id').references('menus.id').onDelete('CASCADE');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('permissions');
};