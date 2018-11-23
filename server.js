require('dotenv').config();

const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const {mainRouter} = require('./routes/main.router');
const db = require('./services/db');

const port = process.env.PORT;
const app  = express();

const init = () => {
    app.use(express.static(path.join(__dirname, 'www')));
    db.initClient();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/', mainRouter);

    app.listen(port, () => { console.log(`Server is now live on port ${port}`); });
};

init();