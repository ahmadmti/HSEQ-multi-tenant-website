const request = require('request');

module.exports = {
    capitalizeFirstLetter: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    makeRandom: function (length) {
        var result = [];
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() *
                charactersLength)));
        }
        return result.join('');
    },
    camelize: function (str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    },
    verifyRecaptcha: function (req) {
        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + process.env.RECAPTCHA_KEY + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

        return new Promise(function (resolve, reject) {
            request(verificationUrl, function (error, response, body) {

                body = JSON.parse(body);
                console.log(body)
                if (body.success !== undefined && !body.success) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            });
        });

    }
}

