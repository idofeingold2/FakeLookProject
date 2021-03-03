const express = require('express');
const http = require('../helpers/http-service');
const enviroment = require('../helpers/enviroment');

const router = express.Router();

const auth = http.axiosCreate(enviroment.serverUrls.auth);
const identity = http.axiosCreate(enviroment.serverUrls.identity);

router.get('/login-via-google', async (req, res) => {
    try{
        const response = await auth.get('/auth/google');
    }catch(err){
        console.log(err);
    }
    // if (response.status >= 400) {
    //     return res.status(response.status).send(response.data);
    // }
    // if (response.data.created) {
    //     const secondResponse = await identity.post('/user/register', response.data);
    //     if (secondResponse.status >= 400) {
    //         return res.sendStatus(secondResponse.status);
    //     }
    //     res.status(200).send(secondResponse.data);
    // }
});

router.get('/login-via-facebook', async (req, res) => {
    const response = await auth.get('/auth/facebook');
    if (response.status >= 400) {
        return res.status(response.status).send(response.data);
    }
    if (response.data.created) {
        const secondResponse = await identity.post('/user/register', response.data);
        if (secondResponse.status >= 400) {
            return res.sendStatus(secondResponse.status);
        }
        res.status(200).send(secondResponse.data);
    }
});

router.get('/login-via-form', async (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    const response = await auth.get('/user/login', { params: { email, password } });
    if (response.status >= 400) {
        return res.status(response.status).send(response.data);
    }
    res.status(200).send(response.data);
});

router.get('/logout', async (req, res) => {
    await auth.get('/user/logout');
});

router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    const user = {
        email,
        username,
        password
    }
    const response = await auth.post('/user/register', user);
    if (response.status >= 400) {
        return res.status(response.status).send(response.data);
    }
    const secondResponse = await identity.post('/user/register', response.data);
    if (secondResponse.status >= 400) {
        return res.sendStatus(secondResponse.status);
    }
    res.status(200).send(secondResponse.data);
});

module.exports = router;
