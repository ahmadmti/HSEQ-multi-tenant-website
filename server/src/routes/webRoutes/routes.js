const express = require('express');
const router = express.Router();
const { checkSubDomain } = require('../../middlewares/domainProtected');
const { body, check } = require('express-validator');
const { AuthController } = require('../../controllers');
const { sessionCheckPublic, onlyUser, sessionCheckProtected } = require('../../middlewares/routeProctections');
const { validationError } = require('../../middlewares/FormValidationError');
const { csrfProtection, parseForm } = require('../../middlewares/csrfToken');
// var url  = require('url');


// *** web Routes 


// (req, res) => {
//     let form = '';
//     form.email = '';
//     res.render("login", { message: req.flash('msg'), form });
// });
// router.get('/forgot-password', (req, res) => {
//     let form = '';
//     form.email = '';
//     res.render("forgotPassword", { form });
// });


// router.get('/reseting-password', (req, res) => {
//     var id = req.params.id;
//     var { query } = req.query;

//     console.log(id);
//     res.render("resetPassword");
// });



// router.post('/admin-password-reset', [checkSubDomain], AuthController.resetAdminPassword);


// router.post('/admin-password-reset-email', [checkSubDomain], AuthController.forgotAdminPasswordEmail);

// router.post('/login', [checkSubDomain], AuthController.webLogin);
// router.get('/logout', [checkSubDomain], AuthController.logout);




// router.get('/email-verify/:id/:token', [checkSubDomain, sessionCheckPublic], AuthController.verifyEmail);



// router.get('/register', [checkSubDomain, sessionCheckPublic], (req, res) => {
//     res.render("register", { message: req.flash('msg') });
// });




module.exports = router;