const express = require('express');
const path = require('path');
const appRoot = require('app-root-path');

const getHandler = require('./get');
const errorHandlerConv = require('../../middlewares/error/handlerConv');
const errorHandlerHTML = require('../../middlewares/error/handlerHTML');

const publicDir = path.join(appRoot.toString(), 'public');

const homepageRouter = express.Router();

homepageRouter.use(express.static(publicDir));
homepageRouter.use(express.static(path.join(publicDir, 'access')));
homepageRouter.use(express.static(path.join(publicDir, 'error')));
homepageRouter.get('/', getHandler(path.join(publicDir, 'access', 'signIn.html')));

homepageRouter.use(errorHandlerConv);
homepageRouter.use(errorHandlerHTML);

module.exports = homepageRouter;