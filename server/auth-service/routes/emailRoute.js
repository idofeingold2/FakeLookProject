const express = require('express');
const router = express.Router();
const userLogic = require('../logic/user-logic');
const emailLogic = require('../logic/email-logic');


router.get('/forgot-password', async (req, res) => {
    const email = req.query.email;
    const user = await userLogic.getUserByEmail(email);
    if(!user.isOAuth){
        emailLogic.sendEmail(email)
            .then(() => {
                res.send('email sent');
            })
            .catch(err => {
                console.log(err);
            });
    }
});

module.exports = router;