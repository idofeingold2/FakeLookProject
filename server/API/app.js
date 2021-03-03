const express = require('express');
const bodyParser = require('body-parser');
const connectRouter = require('./routes/connectRoute');

const PORT = 5000;

const app = express();
app.use(bodyParser.json());

app.use('/connect', connectRouter);

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});