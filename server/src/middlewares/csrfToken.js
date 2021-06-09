var csrf = require('csurf')
var bodyParser = require('body-parser')


// setup route middlewares
exports.csrfProtection = csrf({ cookie: true })
exports.parseForm = bodyParser.urlencoded({ extended: false })


