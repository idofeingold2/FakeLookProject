const express = require('express');
const router = express.Router();
const passport = require('passport');
const userLogic = require('../logic/user-logic');

router.get('/logout', (req, res) => {
    req.logOut();
});

router.get('/login', async (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    const user = await userLogic.getUserByEmail(email);
    const isConnect = await userLogic.checkPassword(user, password);
    if (isConnect) {
        res.send(user);
    } else {
        res.send(null);
    }
});

router.post('/register', async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    const user = await userLogic.createUser(firstName, lastName, username, email, password, false);
    if(user){
        res.send(user);
    } else {
        res.send(null);
    }
});

module.exports = router;