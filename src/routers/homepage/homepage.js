const express = require('express');
const path = require('path');
const appRoot = require('app-root-path');

const getHandler = require('./get');
const errorRouter = require('../../middlewares/error/routerHTML');

const publicDir = path.join(appRoot.toString(), 'public');

const homepageRouter = express.Router();

homepageRouter.use(express.static(publicDir));
homepageRouter.use(express.static(path.join(publicDir, 'access')));
homepageRouter.get('/', getHandler(path.join(publicDir, 'access', 'index.html')));

homepageRouter.use(errorRouter);

module.exports = homepageRouter;