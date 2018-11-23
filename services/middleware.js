const jwt = require('jsonwebtoken');
const {sendApiError} = require('./server.response');

const verifyToken = (req, res) => {
    const bearerToken = req.headers['authorization'];

    try {
        if (bearerToken) {
            const arrToken = bearerToken.split(' ');

            if (arrToken[0] === 'Bearer' || arrToken[1]) {
                const decodedJwt = jwt.verify(arrToken[1], process.env.JWT_SECRET);

                if (decodedJwt) {
                    return decodedJwt;
                }
            }
        }

        throw 'Authorization error';
    } catch (e) {
        sendApiError(res, e, 'Authorization error');
    }
};

module.exports = { verifyToken };