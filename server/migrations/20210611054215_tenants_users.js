exports.up = function (knex) {
    return knex.schema.createTable('tenants_users', function (table) {
        table.increments();
        table.integer('tenant_id').unsigned();
        table.string('admin_name');
        table.string('admin_email').index().nullable();
        table.string('password').nullable();
        table.timestamps(true, true);

        table.foreign('tenant_id').references('tenants.id').onDelete('CASCADE');

    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tenants_users');
};
