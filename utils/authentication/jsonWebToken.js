const jwt = require('jsonwebtoken');

const getJWT = (userInfo) => {
    return jwt.sign(
        {
            id: userInfo._id,
            email: userInfo._email,
            role: userInfo.role
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: 120
        }
    );
}

module.exports = getJWT;