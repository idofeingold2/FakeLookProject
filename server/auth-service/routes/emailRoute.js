const express = require('express');
const router = express.Router();
const userLogic = require('../logic/user-logic');
const emailLogic = require('../logic/email-logic');


router.get('/forgot-password', async (req, res) => {
    const email = req.query.email;
    const result = await userLogic.canChangePassword(email);
    if(!result.err){
        emailLogic.sendEmail(email)
            .then(() => {
                res.send('email sent');
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        res.status(401).send(result.err.message);
    }
});

module.exports = router;