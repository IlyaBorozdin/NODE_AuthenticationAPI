const express = require('express');
const path = require('path');
const appRoot = require('app-root-path');

const authentication = require('../../middlewares/authentication');
const getHandler = require('./get');
const errorHandlerConv = require('../../middlewares/error/handlerConv');
const errorHandlerHTML = require('../../middlewares/error/handlerHTML');

const publicDir = path.join(appRoot.toString(), 'public');

const profileRouter = express.Router();

profileRouter.use(authentication);
profileRouter.use(express.static(publicDir));
profileRouter.use(express.static(path.join(publicDir, 'profile')));
profileRouter.use(express.static(path.join(publicDir, 'error')));
profileRouter.get('/', getHandler);

profileRouter.use(errorHandlerConv);
profileRouter.use(errorHandlerHTML);

module.exports = profileRouter;