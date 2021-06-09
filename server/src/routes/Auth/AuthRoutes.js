const express = require('express');
const router = express.Router();
const { AuthController } = require('../../controllers');
const { body, check } = require('express-validator');
const { hasSubDomainExists } = require('../../middlewares/domainProtected');
const { authenticateToken } = require('../../middlewares/routeProctections');


// *** API Routes 
router.post('/login', [
    body('email').isEmail().withMessage('Email must be valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password is required and min 8 character')],
    AuthController.login);

router.get('/register', AuthController.register);

router.post('/change-password', [hasSubDomainExists, authenticateToken], AuthController.changePassword);


router.post('/forgot-password-email-link', AuthController.forgotPasswordEmail);

router.post('/reset-password', AuthController.resetPassword);


//  user management 



module.exports = router;