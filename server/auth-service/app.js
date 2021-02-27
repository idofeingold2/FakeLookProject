const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sequelize = require('./util/database');
const User = require('./models/user');

const PORT = 4001;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

sequelize.sync({ force: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });