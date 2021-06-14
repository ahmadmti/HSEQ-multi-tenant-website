const commonDBConnection = require('../../dbConfig/commonDBConnection')


let HomeController = {
    getStates: async (req, res) => {
        try {
            let { country_id } = req.body;
            let states = await commonDBConnection('states').select('*').where('country_id', country_id);
            res.status(200).json({ states })
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }

    },
    getCities: async (req, res) => {
        try {
            let { state_id } = req.body;
            let cities = await commonDBConnection('cities').select('*').where('states_id ', state_id);
            res.status(200).json({ cities })
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }

    },
    checkCompany: async (req, res) => {
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
    createCompanyForm: async (req, res) => {
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