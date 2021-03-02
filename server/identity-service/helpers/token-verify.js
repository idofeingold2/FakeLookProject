const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

exports.verify = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, keys.tokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        const newToken = jwt.sign({ id: user.id, email: user.email }, keys.tokenSecret, { expiresIn: '15m' });
        res.cookie('token', newToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
        next();
    });
}