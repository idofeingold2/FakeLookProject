const express = require('express');
const router = express.Router();
const userLogic = require('../logic/user-logic');
const helpers = require('../helpers/helpers');

router.get('/logout', (req, res) => {
    req.logOut();
    res.clearCookie('isLoggedIn');
    res.clearCookie('token');
    res.send('logged out');
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
    const { email, username, password } = req.body;
    const user = await userLogic.createUser(email, username, password, false);
    if (!user.err) {
        res.send(user);
    } else {
        res.status(404).send(user.err.message);
    }
});

router.put('/change-password', helpers.tokenVerify, async (req, res) => {
    const password = req.body.password;
    const id = +req.body.id;
    const user = await userLogic.updatePassword(id, password);
    if(user){
        res.send(user)
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;