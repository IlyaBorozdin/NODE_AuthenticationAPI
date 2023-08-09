const express = require('express');
const path = require('path');
const appRoot = require('app-root-path');

const getHandler = require('./get');

const publicDir = path.join(appRoot.toString(), 'public');

const spaRouter = express.Router();

spaRouter.use(express.static(publicDir));
spaRouter.use(express.static(path.join(publicDir, 'access')));
spaRouter.use(express.static(path.join(publicDir, 'error')));
spaRouter.use(express.static(path.join(publicDir, 'front')));
spaRouter.use(express.static(path.join(publicDir, 'profile')));

spaRouter.get('/', getHandler(path.join(publicDir, 'front', 'main.html')));

module.exports = spaRouter;