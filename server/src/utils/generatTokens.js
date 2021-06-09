const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const generateDynamicsToken = () => {
    return crypto.randomBytes(30).toString('hex');
}


function generateAccessToken(data) {
    return jwt.sign(data, process.env.TOKEN_SECRET);
}

module.exports = { generateDynamicsToken, generateAccessToken }