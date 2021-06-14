const express = require('express');
const router = express.Router();
const { checkSubDomain } = require('../../middlewares/domainProtected');
const { body, check } = require('express-validator');
const { AuthController } = require('../../controllers');
const { sessionCheckPublic, onlyUser, sessionCheckProtected } = require('../../middlewares/routeProctections');
const { validationError } = require('../../middlewares/FormValidationError');
const { csrfProtection, parseForm } = require('../../middlewares/csrfToken');



router.get('/login', [sessionCheckPublic, csrfProtection], AuthController.login);


router.post('/authenticate-user', [sessionCheckPublic, body('email').isEmail().withMessage('Email is Required & Email Must be Valid Email'), body('password').isLength({ min: 8 }).withMessage('Password is Required & Character length Must be more than 8'), parseForm, csrfProtection, validationError()], AuthController.authenticate);

// *** API Routes 


// router.get('/register', AuthController.register);

// router.post('/change-password', [hasSubDomainExists, authenticateToken], AuthController.changePassword);


// router.post('/forgot-password-email-link', AuthController.forgotPasswordEmail);

// router.post('/reset-password', AuthController.resetPassword);


//  user management 



module.exports = router;