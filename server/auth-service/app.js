const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const sequelize = require('./util/database');
const User = require('./models/user');
const googleRouter = require('./routes/googleRoute');
const facebookRouter = require('./routes/facebookRoute');
const userRouter = require('./routes/userRoute');
const emailRouter = require('./routes/emailRoute');

const PORT = 4001;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth/google', googleRouter);
app.use('/auth/facebook', facebookRouter);
app.use('/user', userRouter);
app.use(emailRouter);

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });