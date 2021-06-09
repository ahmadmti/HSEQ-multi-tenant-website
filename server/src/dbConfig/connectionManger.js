const knex = require('knex');

const commonDBConnection = require('./commonDBConnection');
const { getNamespace } = require('cls-hooked');
let connectionMap;

function createConnectionConfig(tenant) {

    return {
        client: process.env.DB_CLIENT,
        connection: {
            host: tenant.db_host,
            port: tenant.db_port,
            user: tenant.db_username,
            database: tenant.db_name,
            password: tenant.db_password
        },
        pool: { min: 2, max: 20 }
    };
}


async function connectAllDb() {
    let tenants;
    try {
        let date = new Date().toISOString().slice(0, 10)

        tenants = await commonDBConnection.select('*').from('tenants').where('expire_on', '>=', date)
            .where('status', 1).where('is_active', 1).where('payment_status', 1);
    } catch (e) {
        console.log('error', e);
        return;
    }

    connectionMap =
        tenants
            .map(tenant => {
                return {
                    [tenant.subdomain]: knex(createConnectionConfig(tenant))
                }
            })
            .reduce((prev, next) => {
                return Object.assign({}, prev, next);
            }, {});
}



/**
 *  Get the connection information (knex instance) for the given tenant's slug.
**/
function getConnectionBySlug(subdomain) {
    if (connectionMap) {
        if (connectionMap[subdomain])
            return connectionMap[subdomain];
        else
            return null;
    }
    else {
        return null;
    }
}


function getConnection() {
    const nameSpace = getNamespace('unique context');
    const conn = nameSpace.get('connection');
    if (!conn) {
        throw 'Connection is not set for any tenant database.';
    }

    return conn;
}


module.exports = { getConnection, connectAllDb, createConnectionConfig, getConnectionBySlug }