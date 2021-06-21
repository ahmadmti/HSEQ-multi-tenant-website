const express = require('express');
const router = express.Router();
const { checkSubDomain } = require('../../middlewares/domainProtected');
const { body, check } = require('express-validator');
const { MenuController } = require('../../controllers');
const { sessionCheckPublic, onlyUser, sessionCheckProtected } = require('../../middlewares/routeProctections');
const { validationError } = require('../../middlewares/FormValidationError');
const { csrfProtection, parseForm } = require('../../middlewares/csrfToken');



// *** API Routes 

router.get('/get-item', MenuController.getMenus);

// router.post('/change-password', [hasSubDomainExists, authenticateToken], AuthController.changePassword);


// router.post('/forgot-password-email-link', AuthController.forgotPasswordEmail);

// router.post('/reset-password', AuthController.resetPassword);


//  user management 



module.exports = router;