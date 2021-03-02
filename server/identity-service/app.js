const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cookieParser = require('cookie-parser');
const User = require('./models/user');
const userRouter = require('./routes/userRoute');

const PORT = 4004;

const app = express();
app.use(cookieParser());

app.use(bodyParser.json());

app.use('/user',userRouter);

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });
