const jwt = require('jsonwebtoken');
const tokenSecret = require('../../common/config/token-secret');

exports.tokenGenerator = (payload) => {
    return jwt.sign(payload, tokenSecret, {expiresIn: '15m'});
}

exports.tokenVerify = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.sendStatus(401);
    }
    jwt.verify(token, tokenSecret, (err, user) => {
        if(err){
            return res.sendStatus(403);
        }
        const newToken = this.tokenGenerator({
            id: user.id,
            email: user.email
        });
        res.cookie('token', newToken, {httpOnly: true, maxAge: 15 * 60 * 1000});
        next();
    });
}