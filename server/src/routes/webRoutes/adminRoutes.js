
const express = require('express');
const { sessionCheckProtected, onlyAdmin } = require('../../middlewares/routeProctections');
const { checkSubDomain } = require('../../middlewares/domainProtected');
const router = express.Router();
// const { AuthController } = require('../../controllers');


router.get('/dashborad', (req, res) => {
    res.render('admin/Dashboard');
})


// router.get('/packages', [sessionCheckProtected, onlyAdmin, checkSubDomain], PackageController.packages);

// router.get('/create-package', [sessionCheckProtected, onlyAdmin, checkSubDomain], (req, res) => {
//     res.render('admin/createPackage');
// })

// router.get('/all-notifications', [sessionCheckProtected, onlyAdmin, checkSubDomain], NotificationController.allNotifications)

// router.post('/create-package', [sessionCheckProtected, onlyAdmin, checkSubDomain], PackageController.createPackage);

// router.get('/manage-restaurant', [sessionCheckProtected, onlyAdmin, checkSubDomain], HomeController.getAllRestaurant);

// router.post('/check-name', [sessionCheckProtected, onlyAdmin, checkSubDomain], PackageController.checkPackageName);

// router.get('/remove-package/:id', [sessionCheckProtected, onlyAdmin, checkSubDomain], PackageController.removePackage)

// router.get('/package-edit/:id', [sessionCheckProtected, onlyAdmin, checkSubDomain], PackageController.editPackage);

// router.post('/edit-package', [sessionCheckProtected, onlyAdmin, checkSubDomain], PackageController.editPackageData);

// router.get('/company-activiation/:id', [sessionCheckProtected, onlyAdmin, checkSubDomain], HomeController.companyActivation)

// router.get('/company-active/:id', [sessionCheckProtected, onlyAdmin, checkSubDomain], HomeController.companyActive);

// router.get('/company-payment-status/:id', [sessionCheckProtected, onlyAdmin, checkSubDomain], HomeController.companyPaymentStatus);

// router.get('/send-notifications', [sessionCheckProtected, onlyAdmin, checkSubDomain], NotificationController.sendNotificationPage)

// router.get('/send-emails', [sessionCheckProtected, onlyAdmin, checkSubDomain], HomeController.sendEmailPage);

// router.post('/send-email-to-users', [sessionCheckProtected, onlyAdmin, checkSubDomain], HomeController.sendEmail)

// router.post('/send-notifications-to-companies', NotificationController.sendNotification);

// router.get('/databases-backups', [sessionCheckProtected, checkSubDomain], BackupController.renderBackups);

// router.get('/remove-notifications/:id', [sessionCheckProtected, onlyAdmin, checkSubDomain], NotificationController.removeNotification)

// router.get('/backup-download/:id', [sessionCheckProtected, checkSubDomain], BackupController.downloadBackup);

// // router.get('/databases-backups', [sessionCheckProtected, checkSubDomain], BackupController.renderBackups);
// router.get('/edit-notifications/:id', [sessionCheckProtected, onlyAdmin, checkSubDomain], NotificationController.editNotificationPage);

// router.get('/upload-csv', [sessionCheckProtected, onlyAdmin, checkSubDomain], CSVController.uploadCSVRender);

// router.post('/upload-csv', [sessionCheckProtected, onlyAdmin, checkSubDomain], CSVController.uploadCSV);
// router.post('/edit-notification', [sessionCheckProtected, onlyAdmin, checkSubDomain], NotificationController.editNotification);

// router.post('/extend-date', [sessionCheckProtected, onlyAdmin, checkSubDomain], HomeController.extendDate);


// router.get('/email-templates', [sessionCheckProtected, onlyAdmin, checkSubDomain], EmailController.createEmailTemplate);

// router.post('/get-template', [sessionCheckProtected, onlyAdmin, checkSubDomain], EmailController.getTemplate);

// router.get('/create-template', [sessionCheckProtected, onlyAdmin, checkSubDomain], EmailController.createEmailTemplateRender);

// router.post('/create-email-template', [sessionCheckProtected, onlyAdmin, checkSubDomain], EmailController.insertEmailTemplate)

// router.get('/remove-template/:id', [sessionCheckProtected, onlyAdmin, checkSubDomain], EmailController.removeTemplate);

// router.get('/edit-template/:id', [sessionCheckProtected, onlyAdmin, checkSubDomain], EmailController.renderEditTemplate);

// router.post('/edit-template', [sessionCheckProtected, onlyAdmin, checkSubDomain], EmailController.updateEmailTemplate)

// router.get('/financial-report', [sessionCheckProtected, onlyAdmin, checkSubDomain], ReportsController.financialReport)

// router.post('/get-financial-report', [sessionCheckProtected, onlyAdmin, checkSubDomain], ReportsController.getFinancialReportAdmin)

// // router.get('/backups', [sessionCheckProtected, onlyAdmin, checkSubDomain], async (req, res) => {
// //     // console.log((await getFiles(`${process.cwd()}/backups`)));
// //     res.send('fd');
// // })

// router.post('/enable-piko-pako', [sessionCheckProtected, onlyAdmin, checkSubDomain], HomeController.enablePikoPako);


// router.get('/users-manage', [sessionCheckProtected, onlyAdmin, checkSubDomain], AuthController.userManagement);

// router.get('/create-users', [sessionCheckProtected, onlyAdmin, checkSubDomain], AuthController.createUser);

// router.post('/add-user', [sessionCheckProtected, onlyAdmin, checkSubDomain], AuthController.addUser);

// // router.post('/add-user', [sessionCheckProtected, onlyAdmin, checkSubDomain], AuthController.addUser);


// router.get('/user-edit/:id', [sessionCheckProtected, onlyAdmin, checkSubDomain], AuthController.editUser);

// router.post('/user-edit', [sessionCheckProtected, onlyAdmin, checkSubDomain], AuthController.updateUser);

// router.post('/remove-restaurant', [sessionCheckProtected, onlyAdmin, checkSubDomain], AuthController.removeRestaurant);

// router.get('/remove-user/:id', [sessionCheckProtected, onlyAdmin, checkSubDomain], AuthController.removeUser);


// router.post('/add-restaurant', [sessionCheckProtected, onlyAdmin, checkSubDomain], AuthController.addRestaurant);

// router.get('/register-users', [sessionCheckProtected, onlyAdmin, checkSubDomain], AuthController.registerUsers);
module.exports = router;