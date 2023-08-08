'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs').promises;
const path = require('path');

const shutdown = require('./src/shutdown');

const loggerHandler = require('./src/middlewares/logger/handler');
const homepageRouter = require('./src/routers/homepage/homepage');
const apiRouter = require('./src/routers/api/api');
const NotFoundError = require('./src/services/errors/notFound');
const errorHandlerConv = require('./src/middlewares/error/handlerConv');
const errorHandlerJSON = require('./src/middlewares/error/handlerJSON');
const profileRouter = require('./src/routers/profile/profile');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(loggerHandler);
app.use('/', homepageRouter);
app.use('/api', apiRouter);
app.use('/profile', profileRouter);
app.use((req, res, next) => {
    next(new NotFoundError('Not Found', req.url));
});
app.use(errorHandlerConv);
app.use(errorHandlerJSON);

const keyPath = path.join(__dirname, 'certificates', 'localhost.key');
const certPath = path.join(__dirname, 'certificates', 'localhost.crt');

Promise.all([
    fs.readFile(keyPath, 'utf8'),
    fs.readFile(certPath, 'utf8')
])
    .then(([keyData, certData]) => {
        const options = { key: keyData, cert: certData };

        const port = process.env.PORT || 443;

        const server = https.createServer(options, app);

        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log('Use, for example: https://localhost:443');
        });

        shutdown(server);
    })
    .catch(err => {
        console.error('Failed to start server', err);
    });
