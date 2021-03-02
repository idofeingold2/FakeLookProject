const express = require('express');
const router = express.Router();
const userLogic = require('../logic/user-logic');

router.post('/register', async (req, res) => {
    const id = +req.body.id
    const { firstName, lastName, username, email } = req.body;
    const user = await userLogic.createUser(id, firstName, lastName, username, email);
    if (user) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

router.get('/details', async (req, res) => {
    const id = +req.query.id;
    const user = await userLogic.getUserById(id);
    if(user) {
        res.send(user);
    }  else {
        res.sendStatus(404);
    }
});

router.put('/update', async (req, res) => {
    const id = +req.query.id;
    const { firstName, lastName, age, workPlace, address } = req.body;
    const user = await userLogic.updateUser(id, firstName, lastName, age, workPlace, address);
    if(user){
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

router.put('/change-username', (req, res) => {
    const id = +req.query.id;
    const username = req.body.username;
    const user = await userLogic.updateUsername(id, username);
    if(user){
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;