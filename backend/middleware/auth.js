const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const authToken = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(authToken, process.env.privateKey);
        const user = await User.findOne({ _id: decodedToken._id, 'tokens.token': authToken });

        if (!user) {
            throw new Error();
        }

        req.token = authToken;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Authentication Error!' });
    }
}

module.exports = auth;