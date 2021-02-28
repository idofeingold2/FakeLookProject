const express = require('express');
const router = express.Router();
const userLogic = require('../logic/user-logic');
const helpers = require('../helpers/helpers');

router.get('/logout', (req, res) => {
    req.logOut();
});

router.get('/login', async (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    const user = await userLogic.getUserByEmail(email);
    const isConnect = await userLogic.checkPassword(user, password);
    if (isConnect) {
        const token = helpers.tokenGenerator({ id: user.id, email: user.email });
        res.cookie('token', token, { maxAge: 15 * 60 * 1000, httpOnly: true });
        res.send('user logged in');
    } else {
        res.sendStatus(401);
    }
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const user = await userLogic.createUser(email, password, false);
    if (user) {
        res.send(user);
    } else {
        res.send(null);
    }
});

module.exports = router;