const { createNamespace } = require('cls-hooked');

const { getConnectionBySlug } = require('../dbConfig/connectionManger');
const { hasSubDomain, subdomain } = require('../utils/subDomainManger');
const path = require('path');
let nameSpace = createNamespace('unique context');

module.exports.resolve = function (req, res, next) {
    if (!hasSubDomain(req)) {
        next();
    } else {
        try {
            let connection = getConnectionBySlug(subdomain(req));
            if (connection)
                nameSpace.run(() => {
                    nameSpace.set('connection', connection);
                    next();
                });
            else
                if (req.headers["x-requested-with"] == 'XMLHttpRequest')
                    res.status(404).json({ error: 'Invalid Domain Kinldy contact with support' })
                else
                    res.sendFile(path.join(__dirname, '../../InvalidDomain', 'index.html'));
        }
        catch (e) {
            res.json({ message: e });
        }
    }
}
