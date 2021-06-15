const { validationError } = require('./FormValidationError');
const { csrfProtection, parseForm } = require('./csrfToken');
const { sessionCheckProtected } = require('./routeProctections');
const { body, check } = require('express-validator');
const commonDBConnection = require('../dbConfig/commonDBConnection');


exports.registerCompanyRules = [
    sessionCheckProtected,
    csrfProtection,
    parseForm,
    body('company_name').custom(async value => {
        if (value) {
            let tenants = await commonDBConnection('tenants').where('company_name', value);
            if (tenants.length > 0) {
                return Promise.reject('Company Name already Created');
            }
        } else {
            return Promise.reject('Company Name Required');

        }

    }),
    body('subdomain').custom(async value => {
        if (value) {
            const re = /^[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*$/;
            if (re.test(value)) {
                let tenants = await commonDBConnection('tenants').where('subdomain', value);
                if (tenants.length > 0) {
                    return Promise.reject('Domain already Created');
                }
            } else {
                return Promise.reject('Wrong Domain Pattern');
            }
        } else {
            return Promise.reject('Domain is Required');
        }

    }),
    check('phone_no', 'Phone Number Is required').notEmpty(),
    check('country_id', 'Country is Required').notEmpty(),
    check('state_id', 'State is Required').notEmpty(),
    check('city_id', 'City is Required').notEmpty(),
    check('admin_name', 'Admin Name Is required').notEmpty(),
    body('admin_email').isEmail().withMessage('Email is Required & Email Must be Valid Email'),
    body('admin_password').isLength({ min: 8 }).withMessage('Password is Required & Character length Must be more than 8'),
    validationError()
];