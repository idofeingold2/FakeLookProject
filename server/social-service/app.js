const express = require('express');
const bodyParser = require('body-parser');
const UserFriends = require('./models/user-friends');

const PORT = 4003;

const app = express();

app.use(bodyParser.json());

sequelize.sync({ force: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });