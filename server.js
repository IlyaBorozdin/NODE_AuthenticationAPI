'use strict';

require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs').promises;
const path = require('path');

const shutdown = require('./src/shutdown');

const loggerHandler = require('./src/middlewares/logger/handler');
const homepageRouter = require('./src/routers/homepage/homepage');
const apiRouter = require('./src/routers/api/api');
const errorRouter = require('./src/middlewares/error/routerJSON');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.use(express.json());
app.use(loggerHandler);
app.use('/', homepageRouter);
app.use('/api', apiRouter);
app.use(errorRouter);

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
