const jwt = require('jsonwebtoken');


module.exports.sessionCheckProtected = function (req, res, next) {
    // Get auth token from the cookies
    const user = req.session.user;
    if (!user) {
        res.redirect('/v1/auth/login')
    } else {
        next();
    }
};

module.exports.sessionCheckPublic = function (req, res, next) {
    // Get auth token from the cookies
    const user = req.session.user;

    if (user) {
        res.redirect('/v1/admin/dashboard')

    } else {
        next();

    }
};

module.exports.onlyAdmin = function (req, res, next) {
    // Get auth token from the cookies
    const user = req.session.user;

    if (user.is_admin)
        next();
    else
        res.redirect('/v1/admin/dashboard');
};
module.exports.onlyUser = function (req, res, next) {
    // Get auth token from the cookies
    const user = req.session.user;

    if (user.is_admin)
        res.redirect('/v1/admin/dashborad');
    else
        next();
};

module.exports.authenticateToken = function (req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    try {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(401)
            req.user = user
            next();
        })
    } catch (e) {
        res.sendStatus(401)
    }

}