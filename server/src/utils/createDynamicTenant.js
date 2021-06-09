const knex = require('knex');
const { createConnectionConfig } = require('../dbConfig/connectionManger');
const commonDBConnection = require('../dbConfig/commonDBConnection');
const bcrypt = require('bcrypt');
const { capitalizeFirstLetter } = require('./helper');


module.exports.createTenant = async function (data) {

    try {
        // create database
        await commonDBConnection.raw(`CREATE DATABASE ${data.db_name}`);

        // config new database

        let newConnection = knex(createConnectionConfig(data));

        // create user table
        await newConnection.schema.createTable('users', function (table) {
            table.increments();
            table.string('fname');
            table.string('lname');
            table.string('email');
            table.string('password');
            table.string('phone_no').nullable();
            table.string('profile_img').nullable();
            table.string('address').nullable();
            table.string('ssn').nullable();
            table.boolean('status').defaultTo(1);
            table.boolean('is_active').defaultTo(1);
            table.integer('role_id').unsigned().nullable();

            table.timestamps();
        });

        await newConnection.schema.createTable('roles', function (table) {
            table.increments();
            table.string('name').index();
            table.boolean('status').defaultTo(0);
            table.timestamps();
        });

        await newConnection.schema.createTable('email_verification', function (table) {
            table.increments();
            table.string('email').index();
            table.string('token');
            table.timestamps();
        });

        await newConnection.schema.createTable('permissions', function (table) {
            table.increments();
            table.integer('role_id').unsigned().index();
            table.integer('menu_id').unsigned().index();
            table.foreign('role_id').references('roles.id').onDelete('CASCADE');

            table.timestamps();
        });

        // category table 

        await newConnection.schema.createTable('categories', function (table) {
            table.increments();
            table.string('category_name').index();
            table.enu('vat_type', ['TAKE_AWAY', 'DELIVERY']);
            table.decimal('vat').defaultTo(0);
            table.string('vat_label');
            table.decimal('vat_take_away').defaultTo(0);
            table.boolean('status').defaultTo(0);
            table.integer('order_no').defaultTo(1);
            table.timestamps();
        });

        await newConnection.schema.createTable('customers', function (table) {

            table.increments();
            table.string('name').index();
            table.string('email').index().nullable();
            table.string('phone_number').nullable();
            table.integer('state_id').unsigned()
            table.integer('city_id').unsigned()
            table.integer('street_id').unsigned()

            table.integer('house_no').nullable();
            table.text('note').nullable();
            table.boolean('status').defaultTo(1);
            table.timestamps();
        });


        
        await newConnection.schema.createTable('customer_cart_points', function (table) {
            table.increments();
            table.integer('customer_id').unsigned();
            table.integer('remaining_points').index();
            table.foreign('customer_id').references('customers.id');
            table.timestamps();
        });


        await newConnection.schema.createTable('offers', function (table) {
            table.increments();
            table.string('name');
            table.string('offer_code ').index();
            table.boolean('status').defaultTo(1);
            table.date('expire_on ');
            table.integer('points ').index();
            table.text('image');
            table.integer('price ').index();

            
            table.timestamps();
        });


        


        await newConnection.schema.createTable('tables', function (table) {
            table.increments();
            table.integer('table_no').index();
            table.integer('seats_available').index();
            table.text('remarks').nullable();
            table.boolean('status').defaultTo(1);
            table.timestamps();
        });


        await newConnection.schema.createTable('company_detail', function (table) {
            table.increments();
            table.string('name').index().nullable();
            table.string('phone_number').nullable();
            table.string('email');
            table.string('address').nullable();
            table.string('logo').nullable();
            table.string('domain').nullable();
            table.string('zip_code').nullable();
            table.boolean('is_piko_pako').defaultTo(0);
            table.text('invoice_footer_line').nullable();
            table.string('invoice_type').nullable();
            table.decimal('vat_din_in').defaultTo(9);
            table.decimal('bonus_system').defaultTo(0);
            table.string('vat_label').nullable().defaultTo('T');
            table.decimal('vat_take_away').defaultTo(19);
            table.timestamps();
        });

        // size

        await newConnection.schema.createTable('size', function (table) {
            table.increments();
            table.string('name ').index();
            table.timestamps();
        });
        // ingredient_categories
        await newConnection.schema.createTable('point_slabs', function (table) {
            table.increments();
            table.decimal('amt_from ').index();
            table.decimal('amt_to ').index();
            table.decimal('points ').index();
            table.timestamps();
        });
        // ingredient_categories
        await newConnection.schema.createTable('ingredient_categories', function (table) {
            table.increments();
            table.string('name ').index();
            table.timestamps();
        });
        // ingredients
        await newConnection.schema.createTable('ingredients', function (table) {
            table.increments();
            table.string('name ').index();
            table.integer('price').index();
            table.integer('ingredient_category_id ').index().unsigned();
            table.foreign('ingredient_category_id').references('ingredient_categories.id');

            table.integer('size_id ').index().unsigned();
            table.foreign('size_id').references('size.id');

            table.timestamps();
        });


        // byproducts_labels

        await newConnection.schema.createTable('byproducts_labels', function (table) {
            table.increments();
            table.string('name ').index();
            table.integer('category_id').index().unsigned();
            table.foreign('category_id').references('categories.id');
            table.text('product_image').index();
            table.string('product_code').index();
            table.decimal('vat');
            table.enu('vat_type', ['TAKE_AWAY', 'DELIVERY']);
            table.decimal('vat_take_away');
            table.boolean('status').defaultTo(0);
            table.timestamps();
        });

        // product_label_sizes

        await newConnection.schema.createTable('product_label_sizes', function (table) {
            table.increments();
            table.string('sku').index();
            table.integer('product_label_id').index().unsigned();
            table.foreign('product_label_id').references('byproducts_labels.id').onDelete('CASCADE');;
            table.integer('purchase_price').index();
            table.integer('size_id').index().unsigned();
            table.foreign('size_id').references('size.id');
            table.integer('sale_price').index();
            table.integer('quantity ').index();
            table.timestamps();
        });

        await newConnection.schema.createTable('reservations', function (table) {
            table.increments();
            table.date('reservation_date').index();
            table.string('customer_name');
            table.time('start_time').index();
            table.time('end_time').index();
            table.integer('total_persons').unsigned();
            table.integer('status').defaultTo(0);
            table.text('remarks').nullable();
            table.timestamps();
        });


        await newConnection.schema.createTable('table_reservation', function (table) {
            table.increments();
            table.integer('reservation_id').unsigned();
            table.integer('table_id').unsigned();
            table.enu('status', ['BOOKED', 'AVAILABLE', 'CANCELLED']).defaultTo('BOOKED');
            table.timestamps();
            table.foreign('reservation_id').references('reservations.id').onDelete('CASCADE');
            table.foreign('table_id').references('tables.id').onDelete('CASCADE');
        });

        await newConnection.schema.createTable('payment_methods', function (table) {
            table.increments();
            table.string('name');
            table.boolean('status').defaultTo(0);
            table.timestamps();
        });


        await newConnection.schema.createTable('orders', function (table) {

            table.increments();
            table.integer('order_no').unsigned().defaultTo(0);
            table.integer('today_order').unsigned().defaultTo(0);
            table.date('order_date').nullable();
            table.integer('created_by').unsigned();
            table.string('customer_id').defaultTo('walking_customer');
            table.dateTime('order_status_date').nullable();
            table.decimal('discount').nullable().defaultTo(0);
            table.decimal('delivery_charges').nullable().defaultTo(0);
            table.enu('order_type', ['DINNING', 'TAKE_AWAY']).defaultTo('TAKE_AWAY');
            table.enu('status', ['PENDING', 'CHECKOUT', 'NEW', 'RETURN']).defaultTo('CHECKOUT');
            table.decimal('vat_amount').nullable().defaultTo(0);
            table.decimal('tax_type').nullable();
            table.boolean('is_piko_pako_order').defaultTo(0);
            table.decimal('total_price').nullable().defaultTo(0);
            table.decimal('amount_received').nullable();
            table.integer('table_id').unsigned().nullable();
            table.string('reason').nullable();
            table.string('payment_type').nullable();
            table.timestamps();

        });


        await newConnection.schema.createTable('order_details', function (table) {
            table.increments();
            table.integer('order_id').unsigned();
            table.integer('product_id').unsigned();
            table.integer('qty').unsigned().nullable();
            table.string('weight').nullable().defaultTo(1)
            table.decimal('vat_percentage').nullable();
            table.decimal('unit_price').nullable();
            table.timestamps();
            table.foreign('order_id').references('orders.id').onDelete('CASCADE');
        });

        await newConnection.schema.createTable('order_vat', function (table) {
            table.increments();
            table.integer('order_id').unsigned();
            table.decimal('vat_amount').nullable().defaultTo(0);
            table.boolean('is_delivery').nullable().defaultTo(0);
            table.decimal('vat_percentage').nullable().defaultTo(0);
            table.decimal('total_amount').nullable().defaultTo(0);
            table.string('vat_label').nullable();

            table.timestamps();
            table.foreign('order_id').references('orders.id').onDelete('CASCADE');
        });


        await newConnection.schema.createTable('piko_pako_orders', function (table) {

            table.increments();
            table.integer('pikoPako_order_id').unsigned();
            table.string('house_number').nullable();
            table.string('landmark').nullable();
            table.string('address').nullable();
            table.decimal('paid_amount').nullable();
            table.string('order_status').nullable().defaultTo('pending');
            table.string('delivery_time').nullable();
            table.string('cancel_time').nullable();
            table.string('payment_method').nullable();
            table.string('user_name').nullable();
            table.string('user_email').nullable();
            table.string('user_contact_number').nullable();
            table.timestamp('add_date');
            table.decimal('discount_amount').nullable();
            table.boolean('is_promoCode_applied').defaultTo(0);
            table.decimal('promoCode_price').defaultTo(0);
            table.decimal('delivery_charges').defaultTo(0);
            table.string('accepted_time').nullable();
            table.text('remarks').nullable();
            table.string('customer_delivery_time').nullable();
            table.timestamps();

        });


        await newConnection.schema.createTable('piko_pako_orders_items', function (table) {
            table.increments();
            table.integer('piko_pako_order_id').unsigned();
            table.integer('qty').unsigned();
            table.decimal('price').defaultTo(0);
            table.decimal('unit_price').defaultTo(0);
            table.decimal('discount_percent').defaultTo(0);
            table.string('discount').defaultTo(0);
            table.string('food_name').nullable();
            table.integer('product_label_size_id').unsigned().nullable();
            table.integer('byproduct_label_id').unsigned().nullable();
            table.timestamps();

            // table.foreign('piko_pako_order_id').references('piko_pako_orders.id').onDelete('CASCADE');
        });

        await newConnection.schema.createTable('product_size_ingredients', function (table) {
            table.increments();
            table.integer('ingredient_id').unsigned();
            table.integer('pls_id').unsigned();
            table.timestamps();
            table.foreign('pls_id').references('product_label_sizes.id').onDelete('CASCADE');

            table.foreign('ingredient_id').references('ingredients.id').onDelete('CASCADE');
        });
  


        let role_id = (await newConnection('roles').insert({
            name: 'admin',
            status: 1,
        }))[0];



        // let tenant = await commonDBConnection('tenants').select('*').where({ 'subdomain': data.subdomain }).first()
        let assignMenus = await commonDBConnection.raw(`SELECT m.* FROM menus m  INNER JOIN tenants_menu ON tenants_menu.menu_id = m.id WHERE tenants_menu.tenant_id = ${data.tenant_id} ORDER BY order_no ASC`);

        for (let row of assignMenus[0]) {
            await newConnection('permissions').insert({ role_id, menu_id: row.id })
        }
        let role_id_2 = (await newConnection('roles').insert({
            name: 'Menu Creator',
            status: 1,
        }))[0];
        let restrictPermisionsMenuIds = await commonDBConnection('menus').where('name', 'Category')
            .orWhere('name', 'Menu').select(['id']);

        let ids = [];
        for (let d_ids of restrictPermisionsMenuIds) {
            ids.push(d_ids.id);
        }

        let restrictPermisionsMenus = await commonDBConnection('menus').whereIn('parent_id', ids);

        for (let row of restrictPermisionsMenus) {
            await newConnection('permissions').insert({ role_id: role_id_2, menu_id: row.id })
        }

        let hashPassword = bcrypt.hashSync(data.admin_password, parseInt(process.env.SALT_ROUNDS));

        userName = data.admin_name.split(' ', 1)

        await newConnection('users').insert({
            fname: capitalizeFirstLetter((userName.length > 0) ? userName[0] : user_name),
            lname: (userName.length > 1) ? userName[1] : '',
            email: data.admin_email,
            password: hashPassword,
            role_id: role_id
        });
        await newConnection('company_detail').insert({
            domain: data.subdomain,
            name: data.restaurant_name
        });
        let methods = [{ name: 'CASH', status: 1 },
        { name: 'BANK', status: 1 },
        { name: 'COD', status: 1 },
        { name: 'CREDIT', status: 1 }];

        methods.map(async (item, index) => {
            await newConnection('payment_methods').insert(item);

        })



    } catch (e) {
        console.log(e);

        throw e;
    }


}