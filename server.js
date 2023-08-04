'use strict';

const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

const keyPath = path.join(__dirname, 'certificates', 'localhost.key');
const certPath = path.join(__dirname, 'certificates', 'localhost.crt');

const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
};

const port = 443;

const server = https.createServer(options, app);

server.listen(port, () => {
    console.log(`Server is running on https on port ${port}`);
});