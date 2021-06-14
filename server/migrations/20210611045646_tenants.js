exports.up = function (knex) {
    return knex.schema.createTable('tenants', function (table) {
        table.increments();
        table.string('company_name').unique();
        table.string('phone_number').nullable();
        table.integer('country_id').nullable();
        table.integer('city_id').nullable();
        table.integer('state_id').nullable();
        table.string('subdomain').unique().index();
        table.string('db_name');
        table.string('db_host');
        table.string('db_username');
        table.string('db_password');
        table.string('db_port');
        table.boolean('is_active').defaultTo(0);
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tenants');
};
