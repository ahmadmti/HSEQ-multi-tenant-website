const commonDBConnection = require('../../dbConfig/commonDBConnection')
const { makeRandom } = require('../../utils/helper');
const { createTenant } = require('../../utils/createDynamicTenant');


let HomeController = {
    getStates: async(req, res) => {
        try {
            let { country_id } = req.body;
            let states = await commonDBConnection('states').select('*').where('country_id', country_id);
            res.status(200).json({ states })
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }

    },
    getCities: async(req, res) => {
        try {
            let { state_id } = req.body;
            let cities = await commonDBConnection('cities').select('*').where('states_id ', state_id);
            res.status(200).json({ cities })
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    },
    registerCompany: async(req, res) => {
        try {
            let data = req.body;
            let tenantCreator = {
                db_name: `${data.subdomain}_db`,
                db_host: process.env.DB_HOST,
                db_username: process.env.DB_USER,
                db_password: process.env.DB_PASSWORD,
                db_port: process.env.DB_PORT || 3306
            }


            let tenant = await commonDBConnection('tenants').insert({
                company_name: data.company_name,
                phone_number: data.phone_no,
                country_id: data.country_id,
                city_id: data.city_id,
                state_id: data.state_id,
                subdomain: data.subdomain,
                is_active: 1,
                ...tenantCreator
            });
            let roles = await commonDBConnection('roles').where('status', 1).where('name', 'app_admin').first();


            let menus = await commonDBConnection('menus').whereNotNull('link').where('status', 1);
            for (let row of menus) {
                await commonDBConnection('permissions').insert({ menu_id: row.id, role_id: roles.id })
            }
            await createTenant({
                ...tenantCreator,
                admin_email: data.admin_email,
                admin_name: data.admin_name,
                admin_password: data.admin_password,
                role_id: roles.id,
                tenant_id: tenant[0],
            })
            let tenantUser = await commonDBConnection('tenants_users').insert({
                tenant_id: tenant[0],
                admin_name: data.admin_name,
                admin_email: data.admin_email,
                password: data.admin_password,
            });

            res.send('vfd');
        } catch (e) {
            console.log(e);
            req.flash('error', [{ msg: 'Error In Domain Creation' }])
            return res.redirect('back');
        }
    },
    checkDomain: async(req, res) => {
        try {
            let { domain } = req.body;
            let tenants = await commonDBConnection('tenants').select('*').where('subdomain', domain);
            if (tenants.length > 0) {
                let dynamicName = [];
                for (let i = 0; i < 5; i++) {
                    dynamicName.push({
                        domain: (domain + makeRandom(i + 1)).toLowerCase()
                    })
                }

                res.status(409).json({ message: 'Domain Name is not Valid', suggestions: dynamicName })
            } else {
                res.status(200).json({ message: 'Domain name is Valid' })
            }
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    },
    checkCompany: async(req, res) => {
        try {
            let { name } = req.body;
            let tenants = await commonDBConnection('tenants').select('*').where('company_name  ', name);
            if (tenants.length <= 0) {
                res.status(200).json({ message: 'Company Name is Valid' })
            } else {
                res.status(409).json({ error: 'Company Already Exits' })
            }
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    },
    createCompanyForm: async(req, res) => {
        try {
            let countries = await commonDBConnection('countries').select('*');
            res.render('admin/CreateCompany', {
                countries,
                form: (req.flash('form')[0]),
                csrf_token: req.csrfToken(),
                message: req.flash('msg'),
                errors: (req.flash('error')[0]),
            });
        } catch (e) {
            console.log(e);
            res.redirect('/v1/admin/dashboard');
        }
    }
}

module.exports = HomeController