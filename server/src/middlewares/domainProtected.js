const path = require("path");
const { hasSubDomain, subdomain } = require('../utils/subDomainManger');

module.exports = {
    checkSubDomain: function (req, res, next) {
        if (hasSubDomain(req)) {
            res.sendFile(path.join(__dirname, '../../build', 'index.html'));
        } else {
            next();
        }
    },
    hasSubDomainExists: function (req, res, next) {
        if (hasSubDomain(req)) {
            next();
        } else {
            res.status(404).json({ error: "invalid Domain" });
        }
    }
}