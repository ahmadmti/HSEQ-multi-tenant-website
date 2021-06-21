const express = require('express');
const { UserController } = require('../../controllers');
const { hasSubDomainExists } = require('../../middlewares/domainProtected');
const { authenticateToken } = require('../../middlewares/routeProctections');

const router = express.Router();




router.get('/roles', [hasSubDomainExists, authenticateToken], UserController.getRoles);

router.post('/create-user', [hasSubDomainExists, authenticateToken], UserController.createUser);

router.post('/remove-user', [hasSubDomainExists, authenticateToken], UserController.removeUser);

router.post('/update-user', [hasSubDomainExists, authenticateToken], UserController.updateUser);


router.get('/all-users', [hasSubDomainExists, authenticateToken], UserController.getAllUser);


module.exports = router;