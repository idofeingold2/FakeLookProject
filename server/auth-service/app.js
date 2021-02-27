const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const sequelize = require('./util/database');
const User = require('./models/user');
const googleRouter = require('./routes/googleRoute');
const userRouter = require('./routes/userRoute');

const PORT = 4001;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth/google', googleRouter);
app.use(userRouter);

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });