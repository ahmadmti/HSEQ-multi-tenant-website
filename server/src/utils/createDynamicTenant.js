const knex = require('knex');
const { createConnectionConfig } = require('../dbConfig/connectionManger');
const commonDBConnection = require('../dbConfig/commonDBConnection');
const bcrypt = require('bcrypt');
const { capitalizeFirstLetter } = require('./helper');


module.exports.createTenant = async function (data) {

    try {

        //drop Database
        await commonDBConnection.raw(`DROP DATABASE IF EXISTS ${data.db_name}`);
        // create database

        await commonDBConnection.raw(`CREATE DATABASE ${data.db_name}`);

        let newConnection = knex(createConnectionConfig(data));

        // config new database
        return await newConnection.transaction(async trx => {

            // create user table
            await newConnection.schema.createTable('users', function (table) {
                table.increments();

                table.string('name');
                table.string('email');
                table.string('password');

                table.boolean('status').defaultTo(1);
                table.boolean('is_active').defaultTo(1);
                table.timestamps();
            }).transacting(trx);


            let hashPassword = bcrypt.hashSync(data.admin_password, parseInt(process.env.SALT_ROUNDS));


            await newConnection('users').insert({
                name: capitalizeFirstLetter(data.admin_name),
                email: data.admin_email,
                password: hashPassword,
            }).transacting(trx);
        })
    } catch (e) {
        console.log(e);

        throw e;
    }


}