const jwt = require('jsonwebtoken'),
    crypto = require('crypto');

module.exports = {
    generate: function generateToken(user)
    {
        return "JWT " + jwt.sign(user, config.secret, {
                expiresIn: 10080 // in seconds
            });
    }
};
