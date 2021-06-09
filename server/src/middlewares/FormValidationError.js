const { validationResult } = require('express-validator');

exports.validationError = (type) => {

    return (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            if (type == 'json')
                return res.status(400).json({ errors: errors.array() });
            else {
                let error = {};
                for (let _err of errors.array()) {
                    error[_err.param] = _err.msg;
                }
                req.flash('form', req.body);
                req.flash('error', error);
                return res.redirect('back');
            }
        }
        next();
    }
}