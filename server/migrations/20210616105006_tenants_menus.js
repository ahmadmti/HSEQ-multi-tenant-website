exports.up = function (knex) {
    return knex.schema.createTable('tenants_menus', function (table) {
        table.increments();
        table.integer('tenant_id').unsigned().index();
        table.integer('menu_id').unsigned().nullable().index();
        table.timestamps(true, true);

        table.foreign('tenant_id').references('tenants.id').onDelete('CASCADE');
        table.foreign('menu_id').references('menus.id').onDelete('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tenants_menus');
};
