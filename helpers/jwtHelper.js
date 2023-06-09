const JWT = require('jsonwebtoken');

const jwtSettings = require('../constants/jwtSetting');

const encodeToken = (user) => {
    return JWT.sign({
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1),
        ...user,
        algorithm: 'HS256',
    }, jwtSettings.SECRET)
}

module.exports = encodeToken;